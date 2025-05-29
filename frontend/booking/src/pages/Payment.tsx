import React from 'react'
import { useSearchParams } from 'react-router-dom'
import { showToast } from '../context/ToastProvider'

const Payment = () => {
    const [searchParams] = useSearchParams()
    const hotel = searchParams.get('hotel') || ""
    const roomName = searchParams.get('roomName') || ""
    const roomId = searchParams.get('roomId') || ""
    const user = searchParams.get('user') || ""
    const roomNumber = searchParams.get('roomNumber') || ""
    const checkIn = searchParams.get('checkIn') || ""
    const checkOut = searchParams.get('checkOut') || ""



    const roomBooking = async (roomId: string, roomNumber: number, userId: string, checkIn: Date, checkOut: Date) => {
        if (!userId || !roomId) {
            return showToast('warn', "You need to login first!")
        }
        try {
            const res = await fetch("http://localhost:5000/api/room/book", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ roomId, roomNumber, userId, checkIn, checkOut })
            })

            const { success, message } = await res.json()
            if (!res.ok || success === false) {
                throw new Error(message)
            }
            console.log("booking room successfull.")
            showToast('success', message)

        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message)
                throw new Error(error.message)
            }
        }

    }

    return (
        <section className=" py-20 flex gap-4   max-w-6xl mx-auto">
            <main>

            </main>
            <div>
                <div className='bg-white shadow border rounded w-96 p-4 flex flex-col gap-2'>
                    <h1 className='font-roboto text-2xl font-semibold mb-2'>Comfrim Your Detail</h1>
                    <div>
                        <label htmlFor="name" className='font-medium '>Your Name</label>
                        <input className='border bg-neutral-200 p-1.5  w-full rounded' type="text" name='name' value={"your name"} placeholder='your name' />
                    </div>
                    <div>
                        <label htmlFor="email" className='font-medium '>Your Email</label>
                        <input className='border bg-neutral-200 p-1.5  w-full rounded' type="email" id='email' name='email' value={"your email"} placeholder='exampe@gmail.com' />
                    </div>
                    <div className='self-end'>
                        <button className='btn '>Comfrim your booking</button>
                    </div>
                </div>
            </div>
            <div>
                <div className='bg-white shadow border rounded w-80 p-4'>
                    <h1 className='font-roboto text-2xl font-semibold mb-2'>Your Booking Summary</h1>
                    <div className='flex justify-between items-center border-b py-1.5'>
                        <h2 className='font-roboto font-semibold'>Hotel</h2>
                        <p className='font-roboto'>Hotel </p>
                    </div>
                    <div className='flex justify-between items-center border-b py-1.5'>
                        <h2 className='font-roboto font-semibold'>Room</h2>
                        <p className='font-roboto'>Room</p>
                    </div>
                    <div className='flex justify-between items-center border-b py-1.5'>
                        <h2 className='font-roboto font-semibold'>Room Numbers</h2>
                        <p className='font-roboto'>12</p>
                    </div>
                    <div className='flex justify-between items-center border-b py-1.5'>
                        <h2 className='font-roboto font-semibold'>CheckIn</h2>
                        <p className='font-roboto'>{checkIn}</p>
                    </div>
                    <div className='flex justify-between items-center border-b py-1.5'>
                        <h2 className='font-roboto font-semibold'>CheckOut</h2>
                        <p className='font-roboto'>{checkOut}</p>
                    </div>
                    <div className='flex justify-between items-center  py-1.5'>
                        <h2 className='font-roboto font-bold text-xl'>Total</h2>
                        <p className='font-roboto font-semibold text-lg'>120 $</p>
                    </div>

                </div>
            </div>
            {/*          
            <button className='bg-red-400' onClick={() => roomBooking(room, Number(roomNumber), user!, checkInDate, checkOutDate)} >Pay Now</button> */}

        </section>
    )
}

export default Payment