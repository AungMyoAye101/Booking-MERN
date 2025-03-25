import React, { useState } from 'react'

type RoomType = {
    title: string,
    description: string,
    price: number,
    maxPeople: number,
    roomNumber: ''
}

const RoomForm = ({ hotelId }: { hotelId: string }) => {
    const [room, setRoom] = useState<RoomType>({
        title: '',
        description: '',
        price: 0,
        maxPeople: 0,
        roomNumber: ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setRoom((pre) => ({ ...pre, [name]: name === 'price' || name === 'maxPeople' ? +value : value }));
    };



    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const roomNumber = room.roomNumber.split(',').map((num) => num.trim())
        const newRoom = { ...room, roomNumber }
        console.log(newRoom)

        try {
            const res = await fetch(`http://localhost:5000/api/room/${hotelId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newRoom)
            })

            if (!res.ok) throw new Error('Something went wrong')
            const data = await res.json()
            console.log(data)
        } catch (error) {
            console.log(error)

        }
    }


    return (
        <form className="flex flex-col gap-4 " onSubmit={(e) => onSubmit(e)}>
            <h1 className="text-2xl font-semibold font-roboto capitalize">Create room</h1>
            <label htmlFor="title" className='label'>
                Title
                <input type="text" id="title" name="title" className="input" onChange={(e) => handleChange(e)} />
            </label>
            <label htmlFor="description" className='label'>
                Description
                <textarea id="description" name="description" className="input focus:outline-none min-h-20" onChange={(e) => handleChange(e)} />
            </label>
            <label htmlFor="price" className='label'>
                Price per night
                <input type="number" id="price" name="price" className="input" onChange={(e) => handleChange(e)} />
            </label>
            <label htmlFor="maxPeople" className='label'>
                Max people
                <input type="number" id="maxPeople" name="maxPeople" className="input" onChange={(e) => handleChange(e)} />
            </label>
            <label htmlFor="roomNumber" className='label'>
                RoomNumber
                <input type="text" id="roomNumber" name="roomNumber" placeholder='Room Numbers (comma-separated)' className="input" onChange={(e) => handleChange(e)} />
            </label>
            <button type='submit' className='btn self-end'>Create romm</button>
        </form >
    )
}

export default RoomForm