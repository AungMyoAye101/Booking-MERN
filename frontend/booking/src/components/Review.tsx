
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
      if (!res.ok && success === 'false') {
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
    <section className="flex gap-4 w-full">
      {
        reviews.map((item, i) => (
          <div key={i} className="min-w-52 max-w-64 py-4 ">
            <div className="bg-white rounded-xl shadow-xl">
              <div className="flex flex-col gap-2 px-2 py-1">
                <div className=" flex items-center gap-2">
                  <img
                    src="https://img.freepik.com/free-photo/colonial-style-house-night-scene_1150-17925.jpg?t=st=1739537537~exp=1739541137~hmac=4ea038e25fe4731404bfcdd8bc276c05b04c8e65c734e586c23ad03f815409e3&w=740"
                    alt="user profile photo"
                    className="w-10 h-10 rounded-full "
                  />
                  {/* <div className="font-roboto flex flex-col ">
                    <h2 className="text-sm font-semibold">{item.userId.name}</h2>
                    <p className="text-xs">{item.userId.email}</p>
                  </div> */}
                </div>
                <p className="font-serif text-sm">
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
            </div>
          </div>
        ))
      }

    </section>
  );
};

export default Review;
