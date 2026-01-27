import Booking from "../models/booking.model";
import Hotel from "../models/hotel.model";
import Payment from "../models/payment.model";
import Room from "../models/room.model";
import User from "../models/user.model";
import { endOfMonth, last6Months, MONTHS, next6Months, startOfMonth } from "../utils/date-helper";

export const getTotalRevenueService = async () => {
    const now = new Date();
    const prevMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)
    const startOfCurrMonth = startOfMonth(now)
    const endOfCurrMonth = endOfMonth(now)
    const startOfPrevMonth = startOfMonth(prevMonth)
    const endOfPrevMonth = startOfCurrMonth;

    const startOfSixMonths = new Date(
        now.getFullYear(), now.getMonth() - 5, 1
    )
    const [result, monthlyChart, paymentMethod] = await Promise.all([
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

        ]),
        Payment.aggregate([
            {
                $match: {
                    status: "PAID"
                }
            },
            {
                $group: {
                    _id: "$paymentMethod",
                    total: { $sum: "$amount" }
                }
            }, {
                $project: {
                    _id: null,
                    method: "$_id",
                    total: 1
                }
            }
        ])
    ])

    const current = result[0]?.current[0]?.total ?? 0;
    const previous = result[0]?.previous[0]?.total ?? 0;

    const chart = last6Months().map(m => {
        const found = monthlyChart.find(
            x => x._id.year === m.year && x._id.month === m.month
        );

        return {
            month: m.label,
            total: found?.total ?? 0
        };
    });


    //payment 

    const ALL_METHODS = ["CARD", "MOBILE_BANKING", "BANK"];

    const payments = ALL_METHODS.map(method => {
        const found = paymentMethod.find(m => m.method === method);
        return {
            method,
            total: found?.total ?? 0
        }
    })

    return {
        current,
        previous,
        chart,
        payments
    };

}

export const totalService = async () => {
    const now = new Date();
    const startOfCurrMonth = startOfMonth(now)
    const endOfCurrMonth = endOfMonth(now)
    const startOfSixMonths = new Date(
        now.getFullYear(), now.getMonth() - 5, 1
    )
    const [users, hotels, bookings] = await Promise.all([
        User.countDocuments({
            createdAt: {
                $gte: startOfSixMonths,
                $lt: endOfCurrMonth
            },
        }),
        Hotel.countDocuments(),
        Booking.countDocuments({
            createdAt: {
                $gte: startOfSixMonths,
                $lt: endOfCurrMonth
            },
            status: {
                $in: ["STAYED", "CONFIRMED"],

            }
        })
    ])

    return {
        users,
        hotels,
        bookings
    };

}

export const getTotalBooking = async () => {
    const now = new Date();
    const startOfCurrMonth = startOfMonth(now)
    const endOfSixMonths = new Date(
        now.getFullYear(), now.getMonth() + 5
    )

    const data = await Booking.aggregate([
        {
            $match: {
                // status: {
                //     $in: ["STAYED", "CONFIRMED"]
                // },
                checkIn: {
                    $gte: startOfCurrMonth,
                    $lte: endOfSixMonths

                },
            }
        },
        {
            $group: {
                _id: {
                    year: { $year: "$checkIn" },
                    month: { $month: "$checkIn" }
                },
                total: { $sum: 1 }
            }
        },
        {
            $sort: {
                "_id.year": -1,
                "_id.month": -1,
            }
        },
        {
            $project: {
                _id: 0,
                year: "$_id.year",
                month: "$_id.month",
                total: 1,
            },
        },


    ])

    const result = next6Months().map(m => {
        const found = data.find(
            x => x.year === m.year && x.month === m.month
        );

        return {
            month: m.label,
            total: found?.total ?? 0
        };
    });

    return result;
}


export const getRoomTypesCountService = async () => {
    const data = await Room.find
}