import { useEffect, useState } from "react";
import { base_url } from "../lib/helper";

interface TotalDataType {
  totalUsers: number,
  totalHotels: number
}
const Dashboard = () => {
  const [totalData, setTotalData] = useState<TotalDataType>()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(base_url + "/api/total", {
          method: "GET",
          headers: {
            "Content-type": "application/json"
          }
        })
        const { success, message, data } = await res.json()
        if (!res.ok && !success) {
          throw new Error(message)
        }

        setTotalData(data)
      } catch (error) {
        if (error instanceof Error) console.error(error.message)
      }
    }

    fetchData()
  }, [])
  return (
    <section className="flex flex-col md:flex-row gap-4 font-roboto mt-14 h-screen">
      <div className="border border-gray-300 bg-white w-96 h-60 rounded-lg shadow-lg p-4 relative">
        <h2 className="font-semibold text-lg absolute left-4 top-4  ">Total Hotels </h2>

        <div className="flex h-full items-center justify-center ">

          <h1 className="font-bold text-2xl   ">{totalData?.totalHotels}</h1>
        </div>
        <h2 className="font-semibold text-lg  absolute bottom-4 right-4"> Hotels </h2>
      </div>
      <div className="border border-gray-300 bg-white w-96 h-60 rounded-lg shadow-lg p-4 relative">
        <h2 className="font-semibold text-lg absolute left-4 top-4  ">Total Users </h2>

        <div className="flex h-full items-center justify-center ">

          <h1 className="font-bold text-2xl   ">{totalData?.totalUsers}</h1>
        </div>
        <h2 className="font-semibold text-lg  absolute bottom-4 right-4"> Users </h2>
      </div>


    </section>
  );
};

export default Dashboard;
