import { useState } from "react"
import { FaStar } from "react-icons/fa6"
import { ReviewFormType } from "../lib/types"


const ReviewForm = ({ hotelId }: { hotelId: string }) => {
    const [reviews, setReviews] = useState<ReviewFormType>({
        review: '',
        ratings: 1,
        userId: "67cc3e270d58ef78947ae090",
        hotelId
    })

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setReviews((pre) => ({ ...pre, [name]: value }));
    }

    const onSubmit = async () => {

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
            setReviews({
                review: '',
                ratings: 1,
                userId: "67cc3e270d58ef78947ae090",
                hotelId
            })
            console.log("reviewed successfully")
        } catch (error: any) {
            console.log(error.message)
            throw new Error(error.message)
        }
    }




    return (
        <form onSubmit={onSubmit} className='flex flex-col gap-2 w-full min-w-52 max-w-60 py-4 bg-white p-2 rounded-lg shadow-lg'>
            <h1 className="font-roboto font-lg font-medium">Please Leave your review</h1>
            {/* Stars rating for reviews */}
            <div className="flex items-center  gap-1 text-xl">
                {
                    [1, 2, 3, 4, 5].map(num => (
                        <FaStar key={num} className={`cursor-pointer ${num <= reviews.ratings ? "text-amber-500" : "text-neutral-400"}`} onClick={() => setReviews((pre) => ({ ...pre, ratings: num }))} />
                    ))
                }
            </div>
            <textarea name="review" value={reviews.review} placeholder='your review' className="input focus:outline-none" onChange={(e) => handleChange(e)} />
            <button type="submit" className='btn'>Submit</button>
        </form>
    )
}

export default ReviewForm