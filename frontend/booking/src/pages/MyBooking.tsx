import { useEffect, useState } from "react"
import { base_url } from "../lib/helper"
import { Link, useParams } from "react-router-dom"
import { showToast } from "../context/ToastProvider"

interface MyBookingTypes {
    _id: string,
    user: string,
    room: {
        _id: string,
        title: string,
    },
    roomNumber: number,
    totalPrice: number,
    checkIn: Date,
    checkOut: Date
}

const MyBooking = () => {
    const { id } = useParams()
    const [booking, setBooking] = useState<MyBookingTypes[]>([])
    const [loading, setLoading] = useState(false)

    const fetchMyBooking = async () => {
        try {
            const res = await fetch(base_url + `/api/booking/mybooking/${id}`, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                },
                credentials: "include"
            })
            const { success, message, data } = await res.json()
            if (!res.ok && success === false) {
                console.log(message)
                throw new Error(message)
            }
            setBooking(data)
        } catch (error) {
            if (error instanceof Error) {
                console.error(error.message)
            }
        } finally {
            setLoading(false)
        }

    }
    useEffect(() => {
        fetchMyBooking()
    }, [])

    console.log(booking)
    const cancelBooking = async (bookingId: string, userId: string, roomId: string) => {
        try {
            const res = await fetch(base_url + '/api/booking/cancel-booking', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ bookingId, userId, roomId }),
                credentials: "include"
            })
            const { success, message } = await res.json()
            if (!res.ok && success === false) {
                showToast('error', message)
                throw new Error(message)
            }
            const filterBooking = booking.filter(i => i._id !== bookingId)
            setBooking(filterBooking)
            showToast('success', message)
        } catch (error) {
            if (error instanceof Error) {
                console.error(error.message)
            }
        }
    }

    return (
        <section className='h-screen  mt-20 max-w-6xl  mx-auto'>
            {
                loading ? <div className="w-full h-full flex justify-center items-center">
                    <div className="w-40 h-40 border-4 border-blue-600 border-t-0 bg-transparent rounded-full animate-spin" />
                </div>
                    : booking.length === 0 ? <div className="mx-auto py-12 text-center space-y-4">

                        <h1 className="font-roboto text-2xl md:text-4xl font-semibold ">You have not booked a room yet.</h1>

                        <p className="font-roboto ">Please book a room from your interest hotel.</p>
                        <div>

                            <Link to={'/'} className="btn">Go to home page</Link>
                        </div>
                    </div> :
                        <table className='w-full border-collapse border border-neutral-200 shadow-lg  rounded-lg'>
                            <thead>
                                <tr className='bg-blue-600  border border-neutral-200 text-lg  font-serif  text-white'>
                                    <th className='border border-neutral-200 p-1'>Room Name</th>
                                    <th className='border border-neutral-200 p-1'>Room Number</th>
                                    <th className='border border-neutral-200 p-1'>Check in</th>
                                    <th className='border border-neutral-200 p-1'>Check out</th>

                                    <th className='border border-neutral-200 p-1'>Total Price</th>
                                    <th className='border border-neutral-200 p-1'>Status</th>
                                </tr>

                            </thead>
                            <tbody>

                                {
                                    booking.map(item => (
                                        <tr key={item._id}>
                                            <td className='border border-neutral-200 text-center p-2 text-lg'>{item.room.title}</td>
                                            <td className='border border-neutral-200 text-center p-2 text-lg'>{item.roomNumber}</td>
                                            <td className='border border-neutral-200 text-center p-2'>{item.checkIn instanceof Date ? item.checkIn.toLocaleDateString() : new Date(item.checkIn).toLocaleDateString()}</td>
                                            <td className='border border-neutral-200 text-center p-2'>{item.checkOut instanceof Date ? item.checkOut.toLocaleDateString() : new Date(item.checkOut).toLocaleDateString()}</td>
                                            <td className='border border-neutral-200 text-center p-2'>{item.totalPrice} $</td>
                                            <td className='border border-neutral-200 text-center p-2'>
                                                <button
                                                    onClick={() => cancelBooking(item._id, item.user, item.room._id)}
                                                    className='bg-red-500 hover:bg-red-600 px-4 py-1.5 text-sm rounded-lg text-white'
                                                >
                                                    Cancel
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                }


                            </tbody>
                        </table>
            }

        </section>
    )
}

export default MyBooking