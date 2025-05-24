import { useSearchParams } from "react-router-dom"


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


    return (
        <section className='w-80  rounded-lg bg-white  shadow-md '>

            {/* <div className='flex flex-col gap-1 border p-4'>
                 <h3 className="font-roboto text-lg font-semibold">Property rating</h3>

            </div> */}

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
        </section>
    )
}

export default SideBar