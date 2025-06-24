
import { useForm } from 'react-hook-form'
import { showToast } from '../context/ToastProvider'
import { base_url, spinner } from '../lib/helper'

type RoomType = {
    title: string,
    description: string,
    price: number,
    maxPeople: number,
    roomNumber: ''
}


const RoomForm = ({ hotelId }: { hotelId: string }) => {

    const { register, handleSubmit, reset, formState: { isLoading, errors } } = useForm<RoomType>()

    const onSubmit = handleSubmit(async (data) => {


        try {
            const res = await fetch(`${base_url}/api/room/${hotelId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })

            const resData = await res.json()
            if (!res.ok && resData.success === false) throw new Error(resData.message)
            showToast("success", resData.message)
            reset()
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message)
            }

        }
    })


    return (
        <form className="flex flex-col gap-4 py-6 px-6 bg-white border border-neutral-200 shadow rounded-md " onSubmit={onSubmit}>
            <h1 className="text-2xl md:text-3xl text-center font-bold font-roboto capitalize">Create room</h1>
            <label htmlFor="title" className='label input_container'>
                Title
                <input type="text"
                    {...register("title", { required: "Title is required", minLength: { value: 3, message: "Title must contain 3 characters" } })}
                    className="input_con"
                    placeholder='Enter room title'
                />
                {
                    errors.title && <p className='error_message'>{errors.title.message}</p>
                }
            </label>
            <label htmlFor="description" className='label input_container'>
                Description
                <textarea
                    {...register("description", { required: "Description is required", minLength: { value: 3, message: "Description must contain 3 characters" } })}
                    className="input_con min-h-20 border focus:outline-none focus:border-blue-400"
                    placeholder='Enter room description'
                />
                {
                    errors.description && <p className='error_message'>{errors.description.message}</p>
                }
            </label>
            <label htmlFor="price" className='label input_container'>
                Price
                <input type="number"
                    {...register("price", { required: "price is required" })}
                    className="input_con"
                    placeholder='Enter price per night' />
                {
                    errors.price && <p className='error_message'>{errors.price.message}</p>
                }
            </label>
            <label htmlFor="maxPeople" className='label input_container'>
                Max People
                <input type="number"
                    {...register("maxPeople", { required: "Max  people is required" })}
                    className='input_con'
                    placeholder='Enter total guest'
                />
                {
                    errors.maxPeople && <p className='error_message'>{errors.maxPeople.message}</p>
                }
            </label>
            <label htmlFor="roomNumber" className='label input_container'>
                Room Number
                <input type="text"
                    {...register("roomNumber", { required: "Room numbers are required" })}
                    className="input_con"
                    placeholder='Add room number by comma separated.100,101,102'
                />
                {
                    errors.roomNumber && <p className='error_message'>{errors.roomNumber.message}</p>
                }
            </label>

            <button type='submit' disabled={isLoading} className={`btn self-end ${isLoading ? "cursor-not-allowed" : ""}`}>{isLoading ? spinner : "Create room"}</button>
        </form >
    )
}

export default RoomForm