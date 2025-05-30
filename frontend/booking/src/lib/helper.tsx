
export const base_url = 'http://localhost:5000'
export const formatDate = (date: Date) => {
    const d = new Date(date)
    const day = String(d.getDate()).padStart(2, "0")
    const month = String(d.getMonth()).padStart(2, "0")
    const year = String(d.getFullYear())
    return `${day}/${month}/${year}`;
};

