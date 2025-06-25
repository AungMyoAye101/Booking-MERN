import { useEffect, useState } from "react";
import { RoomType } from "../lib/types";
import { MdBed, MdCalendarMonth, MdOutlinePublishedWithChanges } from "react-icons/md";
import { DateRange } from "react-date-range";
import { BsPeople } from "react-icons/bs";

import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { base_url, formatDate } from "../lib/helper";
import { FaUser } from "react-icons/fa6";
import { showToast } from "../context/ToastProvider";


const RoomList = ({ hotelId, hotelName }: { hotelId: string, hotelName: string }) => {

    const [rooms, setRooms] = useState<RoomType[]>([])
    const [roomSearch, setRoomSearch] = useState({
        checkIn: new Date(),
        checkOut: new Date(),
        guests: 0,
        hotel: hotelId
    })
    const [loading, setLoading] = useState(false)

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

    //option
    const [openOPtions, setOpenOPtions] = useState(false);
    const navigate = useNavigate()
    const { user } = useAuth()


    //Set room search data for check available rooms

    const handleRoomSearch = () => {
        setRoomSearch((pre) => ({
            ...pre,
            checkIn: datePicker[0].startDate,
            checkOut: datePicker[0].endDate,
            guests: adultCount + childrenCount,
        }))
    }


    useEffect(() => {
        const checkAvalibleRoom = async () => {
            try {
                setLoading(true)
                const res = await fetch(`${base_url}/api/room/${hotelId}?guest=${roomSearch.guests}&checkIn=${roomSearch.checkIn.toISOString()}&checkOut=${roomSearch.checkOut.toISOString()}`, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json'
                    },

                })
                const { success, message, data } = await res.json()
                if (!res.ok && success === false) {
                    throw new Error(message)
                }
                setRooms(data)

            } catch (error) {
                if (error instanceof Error) console.log(error.message)
            } finally {
                setLoading(false)
            }

        }
        checkAvalibleRoom()

    }, [roomSearch])


    const navigateToCheckout = (hotel: string, room: string, roomId: string, roomNumber: number, userId: string, checkIn: Date, checkOut: Date, price: number) => {
        if (!user._id) {
            return showToast("info", "You need to login first.")
        }
        navigate(`/payment?hotel=${hotel}&room=${room}&roomId=${roomId}&user=${userId}&checkIn=${checkIn}&checkOut=${checkOut}&roomNumber=${roomNumber}&price=${price}`)
    }

    return (
        <section className="w-full space-y-4" id="room">
            <div className="w-fit flex flex-wrap items-center bg-yellow-400 gap-2 p-1.5 rounded-lg">
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
                        className="w-full px-4 cursor-pointer text-xs text-nowrap line-clamp-1 font-roboto flex items-center gap-1"
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
                <button disabled={loading} className="btn flex items-center gap-1" onClick={handleRoomSearch}>
                    {loading ? <div className="bg-transparent border border-white border-t-transparent animate-spin w-4 h-4 rounded-full"></div> : <MdOutlinePublishedWithChanges />} Change Search
                </button>
            </div>
            {/* Room List table */}
            <div className="hidden md:block">

                <table className="w-full border-collapse ">
                    <thead >
                        <tr className="bg-blue-600 text-white rounded-lg">
                            <th className="table-border">Room Name</th>
                            <th className="table-border">Room No</th>
                            <th className="table-border">Guests</th>
                            <th className="table-border">Total Price</th>
                            <th className="table-border">Available</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            rooms.map((room) => (
                                room?.roomNumbers.map((r, i) => (
                                    <tr key={i} className="text-center rounded-lg">
                                        {
                                            i === 0 && (<td rowSpan={room.roomNumbers.length} className="table-border max-w-20">
                                                <div className="font-roboto text-2xl font-semibold ">
                                                    {room.title}
                                                </div>
                                                <div className="">
                                                    {room.description}
                                                </div>


                                            </td>)
                                        }

                                        <td className="table-border"> {r.number}</td>
                                        <td className="table-border"> {room.maxPeople}</td>
                                        <td className="table-border text-amber-500 font-semibold text-lg"> ${room.price}</td>
                                        <td className="table-border">
                                            <button
                                                onClick={() => navigateToCheckout(hotelName, room.title, room._id, r.number, user._id, roomSearch.checkIn, roomSearch.checkOut, room.price)}
                                                className="bg-blue-600 text-white hover:bg-amber-500 px-4 py-2 rounded-md font-roboto"
                                            >
                                                Reserve
                                            </button>
                                            {/* <Link to={`/payment?hotel=${hotelName}&room=${room.title}&roomId=${room._id}&user=${user._id}&checkIn=${roomSearch.checkIn}&checkOut=${roomSearch.checkOut}&roomNumber=${r.number}&price=${room.price}`} className="btn"
                                            >Reserve</Link> */}
                                        </td>
                                    </tr>
                                ))


                            ))
                        }
                    </tbody>
                </table>
            </div>

            <div className="flex flex-col gap-4 md:hidden">
                {
                    rooms.map((room) => (
                        room.roomNumbers.map((r, i) => (
                            <div key={i} className="flex flex-col gap-2 px-4 py-6 bg-white shadow-lg rounded-lg border font-roboto">
                                <h1 className="text-2xl font-semibold font-roboto flex gap-1 items-center "><MdBed />{room.title}</h1>
                                <p className="text-sm font-serif ">{room.description}</p>
                                <div className="flex gap-1 items-center">
                                    <span className="text-lg">Guest-</span>
                                    {Array(room.maxPeople).fill(null).map((_, i) => (
                                        <FaUser key={i} className="text-lg" />
                                    ))}</div>
                                <div className="flex justify-between">

                                    <p className="font-semibold  font-roboto">Room No : {r.number}</p>
                                    <p className="text-xl font-bold  text-amber-600">${room.price}/night</p>
                                </div>
                                <button
                                    onClick={() => navigateToCheckout(hotelName, room.title, room._id, r.number, user._id, roomSearch.checkIn, roomSearch.checkOut, room.price)}
                                    className="bg-blue-400 text-white hover:bg-amber-500 px-4 py-1.5 rounded-md"
                                >
                                    Reserve
                                </button>
                            </div>
                        ))
                    ))
                }
            </div>

        </section>
    );
};

export default RoomList;