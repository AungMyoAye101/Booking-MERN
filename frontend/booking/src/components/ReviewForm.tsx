import { useState } from "react"

type ReviewType = {
    review: string,
    ratings: number,
    hotelId: string,
    userId: string
}
const ReviewForm = ({ hotelId }: { hotelId: string }) => {
    const [reviews, setReviews] = useState<ReviewType>({
        review: '',
        ratings: 1,
        userId: "67cc3e270d58ef78947ae090",
        hotelId
    })

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setReviews((pre) => ({ ...pre, [name]: value }));
    }

    const onSubmit = async (e: any) => {
        e.preventDefault()
        try {
            const res = await fetch("http://localhost:5000/api/review", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(reviews)
            })
            if (!res.ok) {
                throw new Error("review failed!")
            }
            console.log("reviewed succefully")
        } catch (error: any) {
            console.log(error.message)
            throw new Error(error.message)
        }
    }


    return (
        <form onSubmit={onSubmit} className='flex flex-col gap-2 w-full min-w-52 max-w-60 py-4 bg-white p-2 rounded-lg shadow-lg'>
            <h1 className="font-roboto font-lg">Please Leave your review</h1>
            <select name="ratings" id="" className="input" onChange={(e) => handleChange(e)} >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
            <textarea name="review" id="" placeholder='your review' className="input focus:outline-none" onChange={(e) => handleChange(e)} />
            <button type="submit" className='btn'>Submit</button>
        </form>
    )
}

export default ReviewForm