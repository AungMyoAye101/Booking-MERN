export const startOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1)
}
export const endOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 1)
}

export const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

type SixMonthsTypes = {
    year: number,
    month: number,
    label: string
}

export const last6Months = () => {
    const now = new Date();
    const data = Array.from({ length: 6 }, (_, i) => {
        const d = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1);
        return {
            year: d.getFullYear(),
            month: d.getMonth() + 1,
            label: MONTHS[d.getMonth()]
        };
    })
    return data as SixMonthsTypes[];
}

export const next6Months = () => {
    const now = new Date();
    const data = Array.from({ length: 6 }, (_, i) => {
        const d = new Date(now.getFullYear(), now.getMonth() + i, 1);
        return {
            year: d.getFullYear(),
            month: d.getMonth() + 1,
            label: MONTHS[d.getMonth()]
        };
    })
    return data as SixMonthsTypes[];
}

