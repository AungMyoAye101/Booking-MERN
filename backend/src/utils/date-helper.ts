export const startOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1)
}
export const endOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 1)
}

export const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];