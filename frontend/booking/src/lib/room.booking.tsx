export const roomBooking = async (roomId: string, roomNumber: number, userId: string, checkIn: Date, checkOut: Date) => {
    try {
        const res = await fetch("http://localhost:5000/api/room/book", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ roomId, roomNumber, userId, checkIn, checkOut })
        })

        if (!res.ok) {
            throw new Error("Booking failed!")
        }
        console.log("booking room successfull.")

    } catch (error: any) {
        console.log(error.message)
        throw new Error(error.message)
    }

}