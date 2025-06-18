import { useEffect, useState } from "react"
import { base_url } from "../lib/helper"
import { Link, useParams } from "react-router-dom"
import { showToast } from "../context/ToastProvider"
import { MdBed } from "react-icons/md"

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


    const not_found = <div className="mx-auto py-12 text-center space-y-4">

        <h1 className="font-roboto text-2xl md:text-4xl font-semibold ">You have not booked a room yet.</h1>

        <p className="font-roboto ">Please book a room from your interest hotel.</p>
        <div>

            <Link to={'/'} className="btn">Go to home page</Link>
        </div>
    </div>

    return (
        <section className='min-h-screen  mt-20 max-w-6xl  mx-auto px-4 '>
            <div className="hidden md:block">
                {
                    loading ? <div className="w-full h-full flex justify-center items-center">
                        <div className="w-40 h-40 border-4 border-blue-600 border-t-0 bg-transparent rounded-full animate-spin" />
                    </div>
                        : booking.length === 0 ? not_found :
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

            </div>


            <div className="flex flex-col gap-4 md:hidden">
                {
                    booking.length === 0 ? not_found : booking.map((data) => (
                        <div key={data._id} className="flex flex-col  gap-2 px-4 py-6 bg-white shadow-lg rounded-lg border font-roboto">
                            <h1 className="text-2xl  font-semibold font-roboto flex gap-1 items-center justify-center"><MdBed />{data.room.title}</h1>

                            {/* <div className="flex gap-1 items-center">
                                <span className="text-lg">Guest-</span>
                                {Array(data.room.).fill(null).map((_, i) => (
                                    <FaUser key={i} className="text-lg" />
                                ))}</div> */}
                            <div className="flex gap-2 justify-evenly">

                                <div className="flex flex-col  font-roboto font-semibold text-lg text-gray-600 gap-1">
                                    <span>CheckIn</span>
                                    <span>{data.checkIn instanceof Date ? data.checkIn.toLocaleDateString() : new Date(data.checkIn).toLocaleDateString()}</span>
                                </div>
                                <div className="flex flex-col  font-roboto font-semibold text-lg text-gray-600 gap-1">
                                    <span>CheckOut</span>
                                    <span>{data.checkOut instanceof Date ? data.checkOut.toLocaleDateString() : new Date(data.checkOut).toLocaleDateString()}</span>
                                </div>
                            </div>



                            <p className="font-semibold  font-roboto text-center">Room No : {data.roomNumber}</p>
                            <div className="flex items-center justify-center gap-2 text-xl font-semibold">
                                <span className="">Total Price  : </span>
                                <p className=" text-amber-600">{data.totalPrice}$</p>
                            </div>
                            <button
                                onClick={() => cancelBooking(data._id, data.user, data.room._id)}
                                className='bg-red-500 hover:bg-red-600 px-4 py-2  rounded-lg text-white'
                            >
                                Cancel
                            </button>

                        </div>
                    ))
                }
            </div>


        </section>
    )
}

export default MyBooking