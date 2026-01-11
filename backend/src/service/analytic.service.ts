import Payment from "../models/payment.model";
import { endOfMonth, MONTHS, startOfMonth } from "../utils/date-helper";

export const getTotalRevenueService = async () => {
    const now = new Date();
    const prevMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)
    const startOfCurrMonth = startOfMonth(now)
    const endOfCurrMonth = endOfMonth(now)
    const startOfPrevMonth = startOfMonth(prevMonth)
    const endOfPrevMonth = endOfCurrMonth;

    const startOfSixMonths = new Date(
        now.getFullYear(), now.getMonth() - 5, 1
    )
    const [result, monthlyChart] = await Promise.all([
        Payment.aggregate([
            {
                $match: {
                    status: "PAID",
                    paidAt: {
                        $gte: startOfPrevMonth,
                        $lt: endOfCurrMonth
                    }
                }
            },
            {
                $facet: {
                    current: [{
                        $match: {
                            status: "PAID",
                            paidAt: {
                                $gte: startOfCurrMonth,
                                $lt: endOfCurrMonth
                            }
                        }
                    }, {
                        $group: { _id: null, total: { $sum: "$amount" } }
                    }
                    ],
                    previous: [{
                        $match: {
                            status: "PAID",
                            paidAt: {
                                $gte: startOfPrevMonth,
                                $lt: endOfPrevMonth
                            }
                        }
                    }, {
                        $group: { _id: null, total: { $sum: "$amount" } }
                    }
                    ]
                }
            }



        ]),
        Payment.aggregate([
            {
                $match: {
                    status: "PAID",
                    paidAt: {
                        $gte: startOfSixMonths,
                        $lt: endOfCurrMonth,
                    }
                }
            },
            {
                $group: {
                    _id: {
                        year: { $year: "$paidAt" },
                        month: { $month: "$paidAt" }
                    },
                    total: { $sum: "$amount" }
                },
            },
            {
                $sort: {
                    "_id.year": -1,
                    "_id.month": -1,
                }
            },
            { $limit: 6 }

        ])
    ])

    const current = result[0].current[0].total ?? 0;
    const previous = result[0].previous[0].total ?? 0;

    const chart = monthlyChart
        .reverse()
        .map(item => ({
            month: MONTHS[item._id.month - 1],
            total: item.total
        }))

    return {
        current,
        previous,
        chart
    };

}