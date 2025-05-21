import { showToast } from "../context/ToastProvider"

export const roomBooking = async (roomId: string, roomNumber: number, userId: string, checkIn: Date, checkOut: Date) => {
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