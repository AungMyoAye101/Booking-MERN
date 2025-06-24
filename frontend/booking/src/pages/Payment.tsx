
import { useNavigate, useSearchParams } from 'react-router-dom'
import { showToast } from '../context/ToastProvider'
import { useAuth } from '../context/authContext'
import { base_url, formatDate, spinner } from '../lib/helper'
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
    const numberOfNights = checkIn === checkOut ? 1 : Math.abs(
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
            const res = await fetch(base_url + "/api/booking", {
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
        <section className=" h-screen flex justify-center items-center  max-w-6xl mx-auto px-2">
            <img src="/assets/images/hotel-bg.jpg" alt="hotel background photo" className='absolute w-full h-screen object-cover -z-0' />

            <div>
                <div className='bg-white shadow border rounded-lg min-w-[310] max-w-2xl px-6 py-6 relative z-10'>
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
                        <h2 className='font-roboto'>Room Number</h2>
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
                        <h2 className='font-roboto font-semibold text-2xl'>Total</h2>
                        <p className='font-semibold text-2xl text-amber-600'>{totalPrice} $</p>
                    </div>


                    <div className='space-y-2'>


                        <div className='input_container'>

                            <label htmlFor="name" className='font-medium '>Your Name</label>
                            <input readOnly className='input_con' type="text" name='name' value={user.name} placeholder='your name' />
                        </div>
                        <div className='input_container'>
                            <label htmlFor="card " className='font-medium'>Card Number</label>
                            <input type="text" name='card' className='input_con' placeholder='0000 0000 0000 0000' />
                        </div>
                        <div className='flex gap-4 items-center '>
                            <div className='input_container'>
                                <label htmlFor="date" className='font-medium'>Expire Date</label>
                                <input type="text" name='date' className='input_con' placeholder='mm/yy ' />
                            </div>
                            <div className='input_container'>
                                <label htmlFor="security" className='font-medium' >CVC</label>
                                <input type="text" name='security' className='input_con ' placeholder='code' />
                            </div>
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
                        className='w-full bg-orange-500 h-10 rounded-md text-white flex justify-center items-center mt-4'

                    >{loading ? spinner : " Confirm booking"} </button>
                </div>

            </div>


            {/* 
            <button className='bg-red-400' onClick={() => roomBooking(room, Number(roomNumber), user!, checkInDate, checkOutDate)} >Pay Now</button> */}

        </section >
    )
}

export default Payment