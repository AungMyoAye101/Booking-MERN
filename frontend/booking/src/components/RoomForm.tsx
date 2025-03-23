import React, { useState } from 'react'

type RoomType = {
    title: string,
    description: string,
    price: number,
    maxPeople: number,
    roomNumber?: [{ number: number, availableDate: Date }]
}

const RoomForm = ({ hotelId }: { hotelId: string }) => {
    const [room, setRoom] = useState<RoomType>({
        title: '',
        description: '',
        price: 0,
        maxPeople: 0,
        roomNumber: [{ number: 0, availableDate: new Date() }]
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setRoom((pre) => ({ ...pre, [name]: name === "price" || name === "maxPeople" ? +value : value }));
    };

    const addRoomNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setRoom((pre) => ({ ...pre, roomNumber: [{ number: +value, availableDate: new Date() }] }));
        console.log(room)
    }


    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const res = await fetch(`http://localhost:5000/api/room/${hotelId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(room)
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
                <input type="number" id="roomNumber" name="roomNumber" className="input" onChange={(e) => addRoomNumber(e)} />
            </label>
            <button type='submit' className='btn self-end'>Create romm</button>
        </form >
    )
}

export default RoomForm