
export const base_url = import.meta.env.VITE_BASE_API_URI



export const formatDate = (date: Date) => {
    const d = new Date(date)
    const day = String(d.getDate()).padStart(2, "0")
    const month = String(d.getMonth()).padStart(2, "0")
    const year = String(d.getFullYear())
    return `${day}/${month}/${year}`;
};


export const spinner = <div className="w-6 h-6 rounded-full border-2 border-white border-r-0 bg-transparent animate-spin"></div>
export const loadingElem = [1, 2, 3, 4, 5, 6,].map(i => (<div key={i} className="w-full  flex flex-col md:flex-row gap-4 bg-white rounded-lg p-4 shadow-lg border">
    <div className="w-full md:w-40 aspect-video md:aspect-square rounded-lg bg-neutral-200"></div>
    <div className="flex justify-between flex-1 ">

        <div className="flex flex-col gap-2">
            <div className="w-40 h-4 rounded bg-neutral-200"></div>
            <div className="w-40 h-4 rounded bg-neutral-200"></div>
            <div className="w-64 h-4 rounded bg-neutral-200"></div>
            <div className="w-64 h-4 rounded bg-neutral-200"></div>
        </div>
        <div className="hidden md:flex flex-col justify-between">

            <div className="w-10 h-10 bg-neutral-200 rounded-lg self-end"></div>
            <div className="w-40 h-10 bg-neutral-200 rounded-lg self-end"></div>
        </div>
    </div>
</div>))


export const priceRange = [{
    name: "minPrice",
    label: "Min price"
}, {
    name: "maxPrice",
    label: "Max price"
}]

export const ratingInputElems = {
    name: "rating",
    fields: [{ value: 5, label: "5 Stars" }, { value: 4, label: "4 Stars" }, { value: 3, label: "3 Stars" }, { value: 2, label: "2 Stars" }, { value: 1, label: "1 Stars" }]
}

export const sortingElems = [
    {
        fieldsName: "sortByPrice",
        fieldData: [{
            placeholder: "Highest to lowest price",
            value: "highestPrice",
            label: "sortbyHighestPrice"
        }, {

            placeholder: "Lowest to highest price",
            value: "lowestPrice",
            label: "sortByLowestPrice",

        }]
    },
    {
        fieldsName: "sortByRating",
        fieldData: [{
            placeholder: "Highest to lowest rating",
            value: "highestRating",
            label: "sortbyHighestRating"
        }, {

            placeholder: "Lowest to highest rating",
            value: "lowestRating",
            label: "sortByLowestRating",

        }]
    }

]
