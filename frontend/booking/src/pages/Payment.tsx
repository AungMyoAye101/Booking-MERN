
import { useNavigate, useSearchParams } from 'react-router-dom'
import { showToast } from '../context/ToastProvider'
import { useAuth } from '../context/authContext'
import { formatDate, spinner } from '../lib/helper'
import { useState } from 'react'


const Payment = () => {
    const [searchParams] = useSearchParams()
    const hotel = searchParams.get('hotel') || ""
    const room = searchParams.get('room') || ""
    const roomId = searchParams.get('roomId') || ""
    const roomNumber = searchParams.get('roomNumber') || ""
    const price = searchParams.get('price') || ""
    const checkIn = searchParams.get('checkIn')
    const checkOut = searchParams.get('checkOut')

    // for loading status
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()
    const { user } = useAuth()

    const validCheckIn = checkIn ? new Date(checkIn) : new Date();
    const validCheckOut = checkOut ? new Date(checkOut) : new Date(validCheckIn.getTime() + 24 * 60 * 60 * 1000);

    //count how many night will book
    const numberOfNights = Math.abs(
        validCheckIn.getTime() - validCheckOut.getTime()
    ) / (24 * 60 * 60 * 1000);

    //calculate total price
    const totalPrice = Number(price) * numberOfNights;

    //booking function
    const roomBooking = async (roomId: string, roomNumber: number, userId: string, checkIn: Date, checkOut: Date) => {
        if (!userId || !roomId) {
            return showToast('warn', "You need to login first!")
        }
        try {
            setLoading(true)
            const res = await fetch("http://localhost:5000/api/room/book", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ roomId, roomNumber, userId, checkIn, checkOut })
            })

            const { success, message } = await res.json()
            if (!res.ok || success === false) {
                showToast("warn", message)
                throw new Error(message)
            }
            console.log("booking room successfull.")
            showToast('success', message)
            navigate(`/mybooking/${userId}`)


        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message)
                throw new Error(error.message)
            }
        } finally {
            setLoading(false)
        }

    }


    return (
        <section className=" py-20 flex justify-center  max-w-6xl mx-auto">
            <main className='flex  gap-4'>
                <div>
                    <div className='bg-white shadow border rounded w-96 p-4'>
                        <h1 className='font-roboto text-2xl font-semibold mb-2'>Your Booking Summary</h1>
                        <div className='flex justify-between items-center border-b py-1.5'>
                            <h2 className='font-roboto'>Hotel</h2>
                            <p className='font_semibold'>{hotel} </p>
                        </div>
                        <div className='flex justify-between items-center border-b py-1.5'>
                            <h2 className='font-roboto '>Room</h2>
                            <p className='font_semibold'>{room}</p>
                        </div>
                        <div className='flex justify-between items-center border-b py-1.5'>
                            <h2 className='font-roboto'>Room Numbers</h2>
                            <p className='font_semibold'>{roomNumber}</p>
                        </div>
                        <div className='flex justify-between items-center border-b py-1.5'>
                            <h2 className='font-roboto'>CheckIn</h2>
                            <p className='font_semibold'>{checkIn ? formatDate(new Date(checkIn)) : ''}</p>
                        </div>
                        <div className='flex justify-between items-center border-b py-1.5'>
                            <h2 className='font-roboto '>CheckOut</h2>
                            <p className='font_semibold'>{checkOut ? formatDate(new Date(checkOut)) : ''}</p>
                        </div>
                        <div className='flex justify-between items-center border-b py-1.5'>
                            <h2 className='font-roboto '>Length of nights</h2>
                            <p className='font_semibold'>{numberOfNights} {numberOfNights > 1 ? "days" : "day"}</p>
                        </div>
                        <div className='flex justify-between items-center border-b py-1.5'>
                            <h2 className='font-roboto '>Total Price</h2>
                            <p className='font_semibold text-amber-600'>{totalPrice} $</p>
                        </div>


                    </div>
                </div>
                <div>

                    <div className='bg-white shadow border rounded min-w-[32rem] p-4 flex flex-col gap-2'>
                        <h1 className='font-roboto text-2xl font-semibold mb-2'>Comfrim Your Detail</h1>
                        <div>

                            <label htmlFor="name" className='font-medium '>Your Name</label>
                            <input readOnly className='border bg-neutral-200 p-1.5  w-full rounded' type="text" name='name' value={user.name} placeholder='your name' />
                        </div>

                        <div>
                            <label htmlFor="email" className='font-medium '>Your Email</label>
                            <input readOnly className='border bg-neutral-200 p-1.5  w-full rounded' type="email" id='email' name='email' value={user.email} placeholder='exampe@gmail.com' />
                        </div>
                        <div>
                            <label htmlFor="card " className='font-medium'>Card Number</label>
                            <input type="text" name='card' className='border bg-neutral-200 p-1.5  w-full rounded' placeholder='0000 0000 0000 0000' />
                        </div>
                        <div className='flex gap-4 items-center '>
                            <div className='flex flex-col gap-1'>
                                <label htmlFor="date" className='font-medium'>Expire Date</label>
                                <input type="text" name='date' className='border bg-neutral-200 p-1.5  w-full rounded' placeholder='mm/yy ' />
                            </div>
                            <div className='flex flex-col gap-1'>
                                <label htmlFor="scurity" className='font-medium' >CVC</label>
                                <input type="text" name='scurity' className='border bg-neutral-200 p-1.5  w-full rounded' placeholder='code' />
                            </div>
                        </div>
                        <div>
                            <h2 className='font-roboto  font-semibold'>Your Price Summary</h2>
                            <div className='bg-blue-50 p-2 rounded'>
                                <h1 className='font-roboto text-xl font-bold'>Total Cost : <span className='text-amber-500'>{totalPrice} $</span></h1>
                                <p className='text-xs'>Includes taxes and charges </p>
                            </div>


                        </div>
                        <button
                            disabled={loading}
                            onClick={() => roomBooking(
                                roomId,
                                Number(roomNumber),
                                user._id,
                                new Date(checkIn!),
                                new Date(checkOut!)
                            )}
                            className='btn flex justify-center items-center'

                        >{loading ? spinner : " Confirm booking"} </button>
                    </div>

                </div>

            </main >
            {/* 
            <button className='bg-red-400' onClick={() => roomBooking(room, Number(roomNumber), user!, checkInDate, checkOutDate)} >Pay Now</button> */}

        </section >
    )
}

export default Payment