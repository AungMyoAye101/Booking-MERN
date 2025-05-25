import { useSearchParams } from "react-router-dom"

interface SortingElemsType {
    placeholder: string,
    name: string,
    value: boolean
}
const SideBar = () => {
    const [searchParams, setSearchParams] = useSearchParams()


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const updateParams = new URLSearchParams(searchParams)
        console.log(updateParams)
        const { name, value } = e.target
        if (!value || value === '') {
            updateParams.delete(name)
        } else {
            updateParams.set(name, value)
        }
        setSearchParams(updateParams)
    }

    const ratingInputElems = {
        name: "rating",
        fields: [{ value: 5, label: "5 Stars" }, { value: 4, label: "4 Stars" }, { value: 3, label: "3 Stars" }, { value: 2, label: "2 Stars" }, { value: 1, label: "1 Stars" }]
    }

    const sortingElems = [
        {
            fieldsName: "sortByPrice",
            fieldData: [{
                placeholder: "Highest price",
                value: "highestPrice",
                label: "sortbyHighestPrice"
            }, {

                placeholder: "Lowest price",
                value: "lowestPrice",
                label: "sortByLowestPrice",

            }]
        },
        {
            fieldsName: "sortByRating",
            fieldData: [{
                placeholder: "Highest rating",
                value: "highestRating",
                label: "sortbyHighestRating"
            }, {

                placeholder: "Lowest rating",
                value: "lowestRating",
                label: "sortByLowestRating",

            }]
        }

    ]



    return (
        <section className='w-80  rounded-lg bg-white  shadow-md '>

            <div className='flex flex-col gap-1 border p-4'>
                <h3 className="font-roboto text-lg font-semibold">Property price</h3>
                <div className=" flex gap-4 font-roboto text-sm">
                    <label htmlFor="minPrice">
                        Min price
                        <input
                            id="minPrice"
                            type="number"
                            name="minPrice"
                            placeholder="00.00"
                            min={0}
                            onChange={(e) => handleChange(e)}
                            className="w-24 h-10 shadow focus:shadow-green-200 bg-neutral-300 rounded-lg text-sm "
                        />
                    </label>
                    <label htmlFor="maxPrice">
                        Max price
                        <input
                            id="maxPrice"
                            type="number"
                            name="maxPrice"
                            placeholder="00.00"
                            min={100}
                            onChange={(e) => handleChange(e)}
                            className="w-24 h-10 shadow focus:shadow-green-200 bg-neutral-300 rounded-lg text-sm "
                        />
                    </label>


                </div>

            </div>

            {/* filtering by rating */}
            <div className='flex flex-col gap-1 border p-4'>
                <h3 className="font-roboto text-lg font-semibold">Property rating</h3>
                {
                    ratingInputElems.fields.map((field) => (
                        <div key={field.value} className='flex gap-2 items-center '>
                            <input name={ratingInputElems.name} id={ratingInputElems.name + field.value} value={field.value} type="radio" onChange={(e) => handleChange(e)} className="cursor-pointer" />
                            <label htmlFor={ratingInputElems.name + field.value} className='font-roboto text-sm cursor-pointer'>{field.label}</label>
                        </div>
                    ))
                }


            </div>
            {/*             
            Sorting Property */}
            <div className='flex flex-col gap-1 border p-4'>
                <h3 className="font-roboto text-lg font-semibold">Property Sorting</h3>
                {
                    sortingElems.map((fields) => (
                        fields.fieldData.map((data, i) => (
                            <div key={i} className='flex gap-2 items-center '>
                                <input name={fields.fieldsName} id={data.label} type="radio" value={data.value} onChange={(e) => handleChange(e)} className="cursor-pointer" />
                                <label htmlFor={data.label} className='font-roboto text-sm cursor-pointer'>{data.placeholder}</label>
                            </div>
                        ))
                    ))
                }

            </div>
        </section>
    )
}

export default SideBar