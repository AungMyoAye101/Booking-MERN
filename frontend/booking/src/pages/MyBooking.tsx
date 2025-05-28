import { useEffect, useState } from "react"
import { base_url } from "../lib/helper"
import { useParams } from "react-router-dom"

interface MyBookingTypes {
    _id: string,
    user: string,
    room: {
        _id: string,
        title: string,
    },
    totalPrice: number,
    checkIn: Date,
    checkOut: Date
}

const MyBooking = () => {
    const { id } = useParams()
    const [booking, setBooking] = useState<MyBookingTypes[]>([])
    const [loading, setLoading] = useState(false)
    console.log(id)
    const fetchMyBooking = async () => {
        try {
            const res = await fetch(base_url + `/api/user/mybooking/${id}`, {
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
            console.log(data)
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

    return (
        <section className='h-screen  mt-20 max-w-6xl  mx-auto'>
            <table className='w-full border-collapse border border-neutral-200 shadow-lg  rounded-lg'>
                <thead>
                    <tr className='bg-blue-600  border border-neutral-200 text-lg  font-serif  text-white'>
                        <th className='border border-neutral-200 p-1'>Room</th>
                        <th className='border border-neutral-200 p-1'>check in</th>
                        <th className='border border-neutral-200 p-1'>Check out</th>
                        <th className='border border-neutral-200 p-1'>Total Price</th>
                        <th className='border border-neutral-200 p-1'>Payment</th>
                    </tr>

                </thead>
                <tbody>

                    {
                        booking.map(item => (
                            <tr key={item._id}>
                                <td className='border border-neutral-200 text-center p-2 text-lg'>{item.room.title}</td>
                                <td className='border border-neutral-200 text-center p-2'>{item.checkIn instanceof Date ? item.checkIn.toLocaleDateString() : new Date(item.checkIn).toLocaleDateString()}</td>
                                <td className='border border-neutral-200 text-center p-2'>{item.checkOut instanceof Date ? item.checkOut.toLocaleDateString() : new Date(item.checkOut).toLocaleDateString()}</td>
                                <td className='border border-neutral-200 text-center p-2'>{item.totalPrice}</td>
                                <td className='border border-neutral-200 text-center p-2'><button className='bg-green-500 hover:bg-green-600 px-4 py-1.5 text-sm rounded-lg text-white'>pay now</button></td>
                            </tr>
                        ))
                    }


                </tbody>
            </table>
        </section>
    )
}

export default MyBooking