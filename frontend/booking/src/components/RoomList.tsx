import { useState } from "react";
import { RoomType } from "../lib/types";
import { format } from "date-fns";
import { MdCalendarMonth } from "react-icons/md";
import { DateRange } from "react-date-range";
import { FaPeopleArrows } from "react-icons/fa";
import { BsPeople } from "react-icons/bs";

const RoomList = ({ rooms }: { rooms: RoomType[] }) => {
    const [adultCount, setAdultCount] = useState<number>(1);
    const [childrenCount, setChildrenCount] = useState<number>(0);
    const [isDateOpen, setIsDateOpen] = useState(false);
    const [datePicker, setDatePicker] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: "selection",
        },
    ]);
    console.log(datePicker);
    //option
    const [openOPtions, setOpenOPtions] = useState(false);
    const formatDate = (date: Date) => {
        return format(date, "dd/mm/yyyy");
    };

    console.log(rooms)
    return (
        <section className="w-full space-y-4">
            <div className="w-fit flex items-center bg-yellow-400 gap-4 p-2 rounded-lg">
                <div className="flex-1 min-w-60 bg-white  h-10 flex items-center gap-2 rounded-md relative">
                    <div
                        onClick={() => setIsDateOpen(!isDateOpen)}
                        className="font-roboto px-4 text-sm flex items-center gap-1 cursor-pointer  "
                    >
                        <MdCalendarMonth className="text-lg" />
                        {formatDate(datePicker[0].startDate)}
                        <span className="mx-1">to</span>
                        {formatDate(datePicker[0].endDate)}
                    </div>
                    {isDateOpen && (
                        <div className="absolute top-12  ">
                            <DateRange
                                editableDateInputs={true}
                                onChange={(item: any) => setDatePicker([item.selection])}
                                moveRangeOnFirstSelection={false}
                                ranges={datePicker}
                            />
                        </div>
                    )}
                </div>
                {/* Room option here */}
                <div className="flex-1 min-w-60 bg-white  h-10 flex items-center rounded-md relative">
                    <div
                        className="w-full px-4 cursor-pointer text-xs text-nowrap line-clamp-1 font-roboto flex items-cneter gap-1"
                        onClick={() => setOpenOPtions(!openOPtions)}
                    >
                        <BsPeople />
                        {adultCount} Adult {childrenCount} Children
                    </div>
                    {openOPtions && (
                        <div className="absolute top-12  w-full px-6 py-8 bg-white rounded-lg shadow-lg border flex flex-col gap-4">
                            <div className="flex justify-between items-center ">
                                <h3 className="font-semibold font-roboto">Adults</h3>
                                <div className="flex items-center gap-2">
                                    <button
                                        disabled={adultCount <= 1}
                                        onClick={() => setAdultCount((pre) => pre - 1)}
                                        className="bg-transparent text-blue-700 border border-blue-700 rounded hover:bg-blue-200 w-6 h-8  flex justify-center items-center"
                                    >
                                        -
                                    </button>
                                    <span className="font-roboto font-semibold">
                                        {adultCount}
                                    </span>
                                    <button
                                        onClick={() => setAdultCount((pre) => pre + 1)}
                                        className="bg-transparent text-blue-700 border border-blue-700 rounded hover:bg-blue-200 w-6 h-8  flex justify-center items-center"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                            <div className="flex justify-between items-center ">
                                <h3 className="font-semibold font-roboto">Children</h3>
                                <div className="flex items-center gap-2">
                                    <button
                                        disabled={childrenCount <= 0}
                                        onClick={() => setChildrenCount((pre) => pre - 1)}
                                        className="bg-transparent text-blue-700 border border-blue-700 rounded hover:bg-blue-200 w-6 h-8  flex justify-center items-center"
                                    >
                                        -
                                    </button>
                                    <span className="font-roboto font-semibold">
                                        {childrenCount}
                                    </span>
                                    <button
                                        onClick={() => setChildrenCount((pre) => pre + 1)}
                                        className="bg-transparent text-blue-700 border border-blue-700 rounded hover:bg-blue-200 w-6 h-8  flex justify-center items-center"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            <button
                                onClick={() => setOpenOPtions(!openOPtions)}
                                className="bg-transparent border border-blue-700 rounded  text-blue-700 hover:bg-blue-200"
                            >
                                Done
                            </button>
                        </div>
                    )}
                </div>
                <button className="btn">
                    Change Search
                </button>
            </div>
            <table className="w-full border-collapse border border-gray-300 rounded-lg">
                <thead>
                    <tr className="bg-blue-600 text-white">
                        <th className="p-2 border border-gray-300">Room Name</th>
                        <th className="p-2 border border-gray-300">Guests</th>
                        <th className="p-2 border border-gray-300">Price</th>
                        <th className="p-2 border border-gray-300">Available</th>
                    </tr>
                </thead>
                <tbody>
                    {rooms.map((room) => (
                        <tr key={room._id} className="text-center">
                            <td className="p-2 border border-gray-300">{room.title}</td>
                            <td className="p-2 border border-gray-300">{room.maxPeople}</td>
                            <td className="p-2 border border-gray-300">${room.price}</td>
                            <td className="p-2 border border-gray-300">
                                <button className="btn">Reserve</button>
                            </td>


                        </tr>
                    ))}
                </tbody>
            </table>


        </section>
    );
};

export default RoomList;