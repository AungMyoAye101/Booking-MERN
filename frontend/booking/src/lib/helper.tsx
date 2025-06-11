
export const base_url = 'http://localhost:5000'
export const formatDate = (date: Date) => {
    const d = new Date(date)
    const day = String(d.getDate()).padStart(2, "0")
    const month = String(d.getMonth()).padStart(2, "0")
    const year = String(d.getFullYear())
    return `${day}/${month}/${year}`;
};


export const spinner = <div className="w-5 h-5 rounded-full border-4 border-white border-r-0 bg-transparent animate-spin"></div>
export const loadingElem = [1, 2, 3, 4, 5, 6,].map(i => (<div key={i} className="flex-1 flex gap-4 bg-white rounded-lg p-4 shadow-lg border">
    <div className="w-40 aspect-square rounded-lg bg-neutral-200"></div>
    <div className="flex justify-between flex-1 ">

        <div className="flex flex-col gap-2">
            <div className="w-40 h-4 rounded bg-neutral-200"></div>
            <div className="w-40 h-4 rounded bg-neutral-200"></div>
            <div className="w-80 h-4 rounded bg-neutral-200"></div>
            <div className="w-80 h-4 rounded bg-neutral-200"></div>
        </div>
        <div className="flex flex-col justify-between">

            <div className="w-10 h-10 bg-neutral-200 rounded-lg self-end"></div>
            <div className="w-40 h-10 bg-neutral-200 rounded-lg self-end"></div>
        </div>
    </div>
</div>))