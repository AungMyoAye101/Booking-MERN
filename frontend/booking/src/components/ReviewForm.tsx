import { useState } from "react"
import { FaStar } from "react-icons/fa6"
import { useAuth } from "../context/authContext"
import { showToast } from "../context/ToastProvider"
import { base_url } from "../lib/helper"


const ReviewForm = ({ hotelId }: { hotelId: string }) => {
    const { user } = useAuth()
    const [review, setReview] = useState({
        review: '',
        ratings: 1
    })

    const [validationError, setValidationError] = useState('')
    const [loading, setLoading] = useState(false)



    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (review.review.length < 3) {
            return setValidationError("Review must contain at least 3 characters.")
        }
        if (!user._id) {
            showToast('warn', 'You need to sign in first')
            return
        }


        try {
            setLoading(true)
            const res = await fetch(base_url + "/api/review", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({ ...review, hotelId, userId: user._id })
            })
            const { success, message } = await res.json()
            if (!res.ok && success === false) {
                throw new Error(message)
            }
            showToast("info", message)
            setReview({
                review: '',
                ratings: 1
            })
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message)
            }
        } finally {
            setLoading(false)
        }
    }




    return (
        <form onSubmit={onSubmit} className='flex flex-col gap-2  w-72 py-6 px-4 bg-white  rounded-lg shadow-lg border border-gray-300'>
            <h1 className="font-roboto text-lg font-medium">Please Leave your review</h1>
            {/* Stars rating for reviews */}
            <div className="flex items-center  gap-1 text-xl">
                {
                    [1, 2, 3, 4, 5].map(num => (
                        <FaStar key={num} className={`cursor-pointer ${num <= review.ratings ? "text-amber-500" : "text-neutral-400"}`} onClick={() => setReview((pre) => ({ ...pre, ratings: num }))} />
                    ))
                }
            </div>
            <textarea
                name="review"
                value={review.review}
                placeholder='your review'
                className="input focus:outline-none border border-neutral-400 focus:border-green-400 min-h-20 p-2 rounded"
                onChange={(e) => setReview((pre) => ({ ...pre, review: e.target.value }))} />
            {
                validationError && <p className="error_message">{validationError}</p>
            }
            <button disabled={loading} type="submit" className='btn'>{loading ? 'Submitting...' : 'Submit'}</button>
        </form>
    )
}

export default ReviewForm