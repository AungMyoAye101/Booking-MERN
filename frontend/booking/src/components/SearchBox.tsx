import { useState } from "react";
import { DateRange } from "react-date-range";
import { IoBedOutline } from "react-icons/io5";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
import { MdCalendarMonth } from "react-icons/md";
import { useNavigate } from "react-router-dom";


type OptionsType = {
  adult: number;
  children: number;
  room: number;
};
const SearchBox = () => {
  // const { handleSearch } = useSearch()

  const [destination, setDestination] = useState<string>("");
  const [adultCount, setAdultCount] = useState<number>(0);
  const [childrenCount, setChildrenCount] = useState<number>(0);

  const navigate = useNavigate();
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

  // const onSubmit = () => {
  //   handleSearch(destination, datePicker[0].startDate, datePicker[0].endDate, adultCount + childrenCount);
  //   navigate(`/search?destination=${destination}&checkIn=${datePicker[0].startDate}&checkOut=${datePicker[0].endDate}&adultCount=${adultCount}&childrenCount=${childrenCount}`);

  // }

  return (
    <div
      className="w-full   bg-blue-300 border-4 border-blue-300 flex flex-wrap gap-1 rounded-lg  "
    >
      <div className="flex-1 min-w-60 bg-white  h-10 flex items-center rounded-md px-2">
        <IoBedOutline className="text-xl " />
        <input
          type="text"
          name="destination"
          placeholder="Where are you going?"
          className="h-full w-full ml-1 flex-1"
          onChange={(e) => setDestination(e.target.value)}
        />
      </div>
      {/* Date picker here */}
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
          className="px-4 cursor-pointer text-xs text-nowrap line-clamp-1 font-roboto"
          onClick={() => setOpenOPtions(!openOPtions)}
        >
          1 Adult 0 Children 1 Room
        </div>
        {openOPtions && (
          <div className="absolute top-12  w-full px-6 py-8 bg-white rounded-lg shadow-lg border flex flex-col gap-4">
            <div className="flex justify-between items-center ">
              <h3 className="font-semibold font-roboto">Adults</h3>
              <div className="flex items-center gap-2">
                <button

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
                  // disabled={options.children <= 0}
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
            {/* <div className="flex justify-between items-center ">
              <h3 className="font-semibold font-roboto">Rooms</h3>
              <div className="flex items-center gap-2">
                <button
                  disabled={options.room <= 1}
                  onClick={() => optionsHandler(false, "room")}
                  className="bg-transparent text-blue-700 border border-blue-700 rounded hover:bg-blue-200 w-6 h-8  flex justify-center items-center"
                >
                  -
                </button>
                <span className="font-roboto font-semibold">
                  {options.room}
                </span>
                <button
                  onClick={() => optionsHandler(true, "room")}
                  className="bg-transparent text-blue-700 border border-blue-700 rounded hover:bg-blue-200 w-6 h-8  flex justify-center items-center"
                >
                  +
                </button>
              </div>
            </div> */}
            <button
              onClick={() => setOpenOPtions(!openOPtions)}
              className="bg-transparent border border-blue-700 rounded  text-blue-700 hover:bg-blue-200"
            >
              Done
            </button>
          </div>
        )}
      </div>
      <button className="btn" >
        search
      </button>
    </div>
  );
};

export default SearchBox;
