
import { useSearchParams } from 'react-router-dom'
import { showToast } from '../context/ToastProvider'
import { useAuth } from '../context/authContext'
import { formatDate } from '../lib/helper'

const Payment = () => {
    const [searchParams] = useSearchParams()
    const hotel = searchParams.get('hotel') || ""
    const room = searchParams.get('room') || ""
    const roomId = searchParams.get('roomId') || ""
    const roomNumber = searchParams.get('roomNumber') || ""
    const price = searchParams.get('price') || ""
    const checkIn = searchParams.get('checkIn')
    const checkOut = searchParams.get('checkOut')

    const { user } = useAuth()



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
                <div className='bg-white shadow border rounded w-80 p-4'>
                    <h1 className='font-roboto text-2xl font-semibold mb-2'>Your Booking Summary</h1>
                    <div className='flex justify-between items-center border-b py-1.5'>
                        <h2 className='font-roboto font-semibold'>Hotel</h2>
                        <p className='font-roboto'>{hotel} </p>
                    </div>
                    <div className='flex justify-between items-center border-b py-1.5'>
                        <h2 className='font-roboto font-semibold'>Room</h2>
                        <p className='font-roboto'>{room}</p>
                    </div>
                    <div className='flex justify-between items-center border-b py-1.5'>
                        <h2 className='font-roboto font-semibold'>Room Numbers</h2>
                        <p className='font-roboto'>{roomNumber}</p>
                    </div>
                    <div className='flex justify-between items-center border-b py-1.5'>
                        <h2 className='font-roboto font-semibold'>CheckIn</h2>
                        <p className='font-roboto'>{checkIn ? formatDate(new Date(checkIn)) : ''}</p>
                    </div>
                    <div className='flex justify-between items-center border-b py-1.5'>
                        <h2 className='font-roboto font-semibold'>CheckOut</h2>
                        <p className='font-roboto'>{checkOut ? formatDate(new Date(checkOut)) : ''}</p>
                    </div>
                    <div className='flex justify-between items-center  py-1.5'>
                        <h2 className='font-roboto font-bold text-xl'>Total</h2>
                        <p className='font-roboto font-semibold text-lg'>{price} $</p>
                    </div>

                </div>
            </div>
            <div>
                <div className='bg-white shadow border rounded w-96 p-4 flex flex-col gap-2'>
                    <h1 className='font-roboto text-2xl font-semibold mb-2'>Comfrim Your Detail</h1>
                    <div>
                        <label htmlFor="name" className='font-medium '>Your Name</label>
                        <input className='border bg-neutral-200 p-1.5  w-full rounded' type="text" name='name' value={user.name} placeholder='your name' />
                    </div>
                    <div>
                        <label htmlFor="email" className='font-medium '>Your Email</label>
                        <input className='border bg-neutral-200 p-1.5  w-full rounded' type="email" id='email' name='email' value={user.email} placeholder='exampe@gmail.com' />
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
                        <h2 className='font-roboto text-lg font-semibold'>Your Price Summary</h2>
                        <div className='bg-blue-200 p-2 rounded'>
                            <h1 className='font-roboto text-xl font-bold'>Total Cost : 122$</h1>
                            <p className='text-xs'>Includes taxes and charges </p>
                        </div>
                    </div>

                    <button
                        onClick={() => roomBooking(
                            roomId,
                            Number(roomNumber),
                            user._id,
                            new Date(checkIn!),
                            new Date(checkOut!)
                        )}
                        className='btn '

                    > Comfrim booking</button>

                </div>
            </div>
            {/*          
            <button className='bg-red-400' onClick={() => roomBooking(room, Number(roomNumber), user!, checkInDate, checkOutDate)} >Pay Now</button> */}

        </section >
    )
}

export default Payment