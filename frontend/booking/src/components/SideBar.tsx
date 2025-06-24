import { useSearchParams } from "react-router-dom"
import { priceRange, ratingInputElems, sortingElems } from "../lib/helper"


const SideBar = () => {
    const [searchParams, setSearchParams] = useSearchParams()


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const updateParams = new URLSearchParams(searchParams)
        const { name, value, checked } = e.target

        if (name === 'rating') {
            const currentRating = searchParams.get('rating')?.split(',') || []
            let updateRating = checked ? [...currentRating, value] : currentRating.filter(r => r !== value)
            updateRating = [...new Set(updateRating)].sort()
            console.log("update rating", updateRating)

            if (updateRating.length > 0) {
                updateParams.set("rating", updateRating.join(','))
            } else {
                updateParams.delete("rating")
            }
        } else if (!value || value === '') {
            updateParams.delete(name)
        } else {
            updateParams.set(name, value)
        }
        setSearchParams(updateParams)
    }




    return (
        <section className='w-64  rounded-lg bg-white  shadow-md sticky  left-0 '>

            <div className='flex flex-col gap-1 border p-4'>
                <label htmlFor="destination">Destination</label>
                <input
                    type="text"
                    id="destination"
                    name="destination"
                    value={searchParams.get("destination") ?? ""}
                    onChange={e => handleChange(e)}
                    className="bg-neutral-200 py-1.5 px-4 rounded-lgx   " />
            </div>
            <div className='flex flex-col gap-1 border p-4'>
                <h3 className="font-roboto text-lg font-semibold">Property price</h3>
                <div className=" flex  gap-2 font-roboto text-sm">
                    {
                        priceRange.map(field => (
                            <div className="space-y-1" key={field.name}>

                                <label htmlFor={field.name}>
                                    {field.label}
                                </label>
                                <input
                                    id={field.name}
                                    type="number"
                                    name={field.name}
                                    placeholder="00.00"
                                    value={searchParams.get(field.name) ?? ''}
                                    onChange={(e) => handleChange(e)}
                                    className="w-20 h-8 shadow focus:shadow-green-200 bg-neutral-200 rounded-lg     text-sm "
                                />
                            </div>
                        ))
                    }




                </div>

            </div>

            {/* filtering by rating */}
            <div className='flex flex-col gap-1 border p-4'>
                <h3 className="font-roboto text-lg font-semibold">Property rating</h3>
                {
                    ratingInputElems.fields.map((field) => (
                        <div key={field.value} className='flex gap-2 items-center '>
                            <input
                                type="checkbox"
                                name={ratingInputElems.name}
                                id={ratingInputElems.name + field.value} value={field.value}
                                checked={searchParams.get(ratingInputElems.name)?.includes(field.value.toString())}
                                onChange={(e) => handleChange(e)} className="cursor-pointer" />
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
                                <input name={fields.fieldsName} id={data.label} type="radio" value={data.value} checked={searchParams.get(fields.fieldsName) === data.value} onChange={(e) => handleChange(e)} className="cursor-pointer" />
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