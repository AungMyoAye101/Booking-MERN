
import { useState } from 'react'
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md'
import { useSearchParams } from 'react-router-dom'
import { priceRange, ratingInputElems, sortingElems } from '../lib/helper'

const MobileSideBar = () => {
    const [isOpen, setIsOpen] = useState(false)
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
        <>
            <div className='flex flex-wrap gap-1 px-4 relative'>
                <input type="text"
                    id="destination"
                    name="destination"
                    value={searchParams.get("destination") ?? ""}
                    onChange={e => handleChange(e)}
                    className='h-10 border border-gray-300 rounded-md' placeholder='Destination' />
                <button
                    onClick={() => setIsOpen(pre => !pre)}
                    className={`flex justify-center items-center gap-1 border border-gray-300  w-20 h-10 rounded-md ${isOpen ? "bg-blue-400 text-white" : "bg-neutral-200"}`}>
                    Filter
                    {
                        isOpen ? <MdKeyboardArrowUp className='text-lg' /> : <MdKeyboardArrowDown className='text-lg' />
                    }

                </button>
            </div>

            <div className={`h-screen px-4 py-4 rounded-lg bg-white w-full absolute mt-4 z-20 transition-all duration-500 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
                <div className=' flex flex-col gap-4 rounded '>
                    <div className='flex flex-col gap-1 border p-4 rounded'>
                        <h3 className="font-roboto text-lg font-semibold">Property price</h3>
                        <div className=" flex  gap-3 font-roboto ">
                            {
                                priceRange.map(field => (
                                    <div className="flex flex-col gap-1" key={field.name}>

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
                    <div className='flex flex-col gap-1 border p-4 rounded'>
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
                    <div className='flex flex-col gap-1 border p-4 rounded'>
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
                </div>
            </div>

        </>
    )
}

export default MobileSideBar