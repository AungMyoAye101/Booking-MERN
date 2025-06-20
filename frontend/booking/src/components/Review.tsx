
import { useEffect, useState } from "react";
import { ReviewType } from "../lib/types";

const Review = ({ hotelId }: { hotelId: string }) => {
  const [reviews, setReviews] = useState<ReviewType[]>([])
  const fetchReviews = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/review/${hotelId}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json"
        }
      })

      const { success, message, data } = await res.json()
      if (!res.ok && success === false) {
        throw new Error(message)
      }
      setReviews(data)
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message)
      }
    }
  }

  useEffect(() => {
    fetchReviews()
  }, [hotelId])


  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-roboto font-semibold">Guests who stayed here loved</h1>

      <div className="flex flex-wrap gap-4 ">
        {
          reviews.map((item, i) => (

            <div key={i} className="bg-white rounded-lg shadow-lg w-64 border border-gray-300">
              <div className="flex flex-col gap-2 p-2">
                <div className=" flex items-center gap-2">
                  <img
                    src="/assets/images/user-icon.svg"
                    alt="user profile photo"
                    className="w-10 h-10 rounded-full "
                  />
                  <div className="font-roboto flex flex-col ">
                    <h2 className="text-sm font-semibold">{item.userId.name}</h2>
                    <p className="text-xs">{item.userId.email}</p>
                  </div>
                </div>
                <p className="font-roboto px-2">
                  {item.review}
                </p>
              </div>
              <div className="flex items-center justify-end gap-1  border-t border-t-gray-400 p-2">
                <div className="font-roboto">
                  <h3 className="text-sm text-right font-semibold">Good</h3>
                  <p className="text-xs">{reviews.length} reviews</p>
                </div>
                <div className="font-roboto bg-blue-700 py-2 px-3 text-sm rounded-lg text-white">
                  {item.ratings}
                </div>
              </div>
            </div>))

        }

      </div>
    </section>
  );
};

export default Review;
