import { useState } from "react";
import { DateRange } from "react-date-range";
import { IoBedOutline } from "react-icons/io5";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
import { MdCalendarMonth } from "react-icons/md";

type OptionsType = {
  adult: number;
  children: number;
  room: number;
};
const Search = () => {
  const [searchData, setSearchData] = useState({
    text: "",
  });
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
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });
  const formatDate = (date: Date) => {
    return format(date, "dd/mm/yyyy");
  };

  const optionsHandler = (increase: boolean, type: keyof OptionsType) => {
    setOptions((pre) => ({
      ...pre,
      [type]: increase ? options[type] + 1 : options[type] - 1,
    }));
  };

  const handleChange = (e: any) => {
    console.log(searchData);
    const { name, value } = e.target;
    setSearchData((pre) => ({ ...pre, [name]: value }));
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `http://localhost:5000/api/hotel?name=${searchData.text}&limit=4`
      );
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full   bg-blue-300 border-4 border-blue-300 flex gap-1 rounded-lg  ">
      <div className="flex-1 bg-white  h-10 flex items-center rounded-md px-2">
        <IoBedOutline className="text-xl " />
        <input
          type="text"
          placeholder="Where are you going?"
          className="h-full w-full ml-1 flex-1"
        />
      </div>
      <div className="flex-1 bg-white  h-10 flex items-center gap-2 rounded-md relative">
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
      <div className="flex-1 bg-white  h-10 flex items-center rounded-md relative">
        <div
          className="px-4 cursor-pointer text-sm font-roboto"
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
                  disabled={options.adult <= 1}
                  onClick={() => optionsHandler(false, "adult")}
                  className="bg-transparent text-blue-700 border border-blue-700 rounded hover:bg-blue-200 w-6 h-8  flex justify-center items-center"
                >
                  -
                </button>
                <span className="font-roboto font-semibold">
                  {options.adult}
                </span>
                <button
                  onClick={() => optionsHandler(true, "adult")}
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
                  disabled={options.children <= 0}
                  onClick={() => optionsHandler(false, "adult")}
                  className="bg-transparent text-blue-700 border border-blue-700 rounded hover:bg-blue-200 w-6 h-8  flex justify-center items-center"
                >
                  -
                </button>
                <span className="font-roboto font-semibold">
                  {options.children}
                </span>
                <button
                  onClick={() => optionsHandler(true, "adult")}
                  className="bg-transparent text-blue-700 border border-blue-700 rounded hover:bg-blue-200 w-6 h-8  flex justify-center items-center"
                >
                  +
                </button>
              </div>
            </div>
            <div className="flex justify-between items-center ">
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
      <button className="btn">search</button>
    </div>
  );
};

export default Search;
