
import { CreateHotelType } from "../lib/types";
import { hotelAmenities, hotelInputValidation, hotelTypes } from "../config/createHotel";
import { MdOutlineCloudUpload } from "react-icons/md";
import { spinner } from "../lib/helper";

type HotelFormType = {
    hotel: CreateHotelType,
    setHotel: React.Dispatch<React.SetStateAction<CreateHotelType>>,
    loading: boolean,
    handleSubmit: (e: React.FormEvent) => void,
    setPhotoArray: React.Dispatch<React.SetStateAction<any>>,
    amenities: string[],
    setAmenities: React.Dispatch<React.SetStateAction<string[]>>,
    type: "create" | "update"

}

const HotelCreateForm = ({ hotel, setHotel, loading, handleSubmit, setPhotoArray, amenities, setAmenities, type }: HotelFormType) => {


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        setHotel((pre) => ({ ...pre, [name]: name === "rating" || name === "price" ? +value : value }));
    };


    const handleAmenitesChange = (amenity: string) => {
        setAmenities((pre) => (amenities.includes(amenity) ? amenities.filter(a => a !== amenity) : [...pre, amenity]))

    }



    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target;
        if (!files) return console.error("no photo")
        setPhotoArray(Array.from(files))

    };

    return (
        <form onSubmit={handleSubmit} encType="multipart/form-data" className="min-w-2xl flex flex-col  w-full gap-4 bg-white rounded-lg p-4 border">
            <h1 className="text-2xl font-semibold font-roboto capitalize ">{type} hotel</h1>

            {
                hotelInputValidation.map((filed) => (

                    <label htmlFor={filed.name} className="flex flex-col gap-1  " key={filed.name}>
                        <span className="font-roboto text-sm capitalize font-semibold">{filed.label}</span>
                        <input
                            id={filed.name}
                            type={filed.name === "price" ? "number" : "text"}
                            name={filed.name}
                            value={hotel[filed.name as keyof CreateHotelType] || ''}
                            placeholder={filed.placeholder}
                            className="bg-neutral-100 rounded p-2 border w-full"
                            onChange={(e) => handleChange(e)}
                        />
                    </label>
                ))
            }

            <label htmlFor='description' className="flex flex-col gap-1  flex-1" >
                <span className="font-roboto text-sm capitalize font-semibold">Description</span>
                <textarea
                    id='description'
                    name='description'
                    value={hotel.description || ''}
                    placeholder='description'
                    className="bg-neutral-100 rounded p-2 border w-full min-h-28 focus:outline-none"
                    onChange={(e) => handleChange(e)}
                />
            </label>


            <label htmlFor="rating" className="flex flex-col gap-1 flex-1 ">
                <span className="font-roboto text-sm font-semibold">Rating</span>
                <select
                    name="rating"
                    id="rating"
                    className="bg-blue-100 outline-none p-2 rounded"
                    onChange={(e) => handleChange(e)}
                >
                    <option value='' disabled >Please provide a star rating</option>{
                        [1, 2, 3, 4, 5].map((item) => (

                            <option value={item} key={item} selected={hotel.rating === item}>{item}</option>
                        ))
                    }

                </select>
            </label>

            {/* hotel type  */}
            <div className="flex flex-col gap-1 flex-1 ">
                <span className="font-roboto text-sm font-semibold">Please choose a type</span>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">

                    {
                        hotelTypes.map((item) => (
                            <label key={item} className={`font-serif px-4 py-1.5 text-sm rounded-lg ${hotel.type === item ? 'bg-blue-500 text-white' : "bg-neutral-200"} `}>

                                <input type="radio" value={item} name="type" checked={hotel.type === item} onChange={(e) => handleChange(e)} className="hidden" />
                                <span>{item}</span>
                            </label>
                        ))
                    }
                </div>
            </div>

            {/* hotel amenites */}
            <div className="flex flex-col gap-1 flex-1 ">
                <span className="font-roboto text-sm font-semibold">Please Select Amenities:</span>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4  gap-2">

                    {
                        hotelAmenities.map((item) => (
                            <label key={item.value} className={`font-serif px-4 py-1.5 text-sm flex items-center gap-1`}>

                                <input type="checkbox" value={item.value} name="amenities" checked={hotel.amenities.includes(item.value) || amenities.includes(item.value)} onChange={() => handleAmenitesChange(item.value)} />
                                <span>{item.value}</span>
                            </label>
                        ))
                    }
                </div>
            </div>


            <div className="flex gap-4">
                <label htmlFor="photo" className="flex flex-col gap-2 ">
                    <div className="w-32 h-20 bg-neutral-200 rounded-lg flex justify-center items-center cursor-pointer">
                        <MdOutlineCloudUpload className="text-4xl text-gray-400" />
                    </div>
                    <span className="font-roboto text-sm ">Please upload photo</span>
                    <input

                        id="photo"
                        type="file"
                        name="photos"
                        multiple
                        onChange={handlePhotoChange}
                        className="hidden"

                    />
                </label>
                {
                    /* 


                
                    photoArray.length > 0 && photoArray
                        .filter((item): item is string => typeof item === "string")
                        .map((item, index) => (
                            <div className="relative" key={index}>
                                <button
                                    type="button"
                                    className="absolute top-0.5 right-0.5 bg-red-500 text-white rounded-full w-6 h-6 flex justify-center items-center text-sm"
                                    onClick={() => setPhotoArray((pre: (string | ArrayBuffer | null)[]) => pre.filter((_, i: number) => i !== index))}
                                >
                                    X
                                </button>
                                <img src={item} alt="hotel image" className="w-28 h-20 object-cover rounded-lg hover:shadow-md" />
                            </div>

                        ))
                            */}

            </div>


            <button
                type="submit"
                className={`bg-blue-500 w-40 h-10 rounded-md text-white flex justify-center items-center self-end ${loading ? "cursor-not-allowed" : "cursor-pointer"}`}
                disabled={loading}
            >
                {loading ? spinner : "Create Hotel"}

            </button>
        </form>


    )
}

export default HotelCreateForm  