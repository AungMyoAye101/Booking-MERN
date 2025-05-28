import React from 'react'
import { useSearchParams } from 'react-router-dom'
import { showToast } from '../context/ToastProvider'

const Payment = () => {
    const [searchParams] = useSearchParams()
    const room = searchParams.get('room') || ""
    const user = searchParams.get('user') || ""
    const roomNumber = searchParams.get('roomNumber') || ""
    const checkIn = searchParams.get('checkIn') || ""
    const checkOut = searchParams.get('checkOut') || ""
    const checkInDate = new Date(checkIn)
    const checkOutDate = new Date(checkOut)


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
        <section className='h-screen items-center justify-center bg-blue-900'>
            <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, voluptatem molestias? Quos aliquam cupiditate qui, ipsa sapiente, molestiae soluta sint dolorem non impedit, quod nam unde! Cumque perspiciatis rerum voluptates?</h1>
            <button className='bg-red-400' onClick={() => roomBooking(room, Number(roomNumber), user!, checkInDate, checkOutDate)} >Pay Now</button>

        </section>
    )
}

export default Payment