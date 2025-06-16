import { useState } from "react";
import { CreateHotelType, HotelType } from "../lib/types";
import { useNavigate } from "react-router-dom";
import { base_url } from "../lib/helper";
import { useForm } from "react-hook-form";
import { hotelAmenities, hotelInputValidation, hotelTypes } from "../config/createHotel";


type CreateHotelFormType = {
  name: string;
  title: string;
  description: string;
  address: string;
  price: number;
  city: string;
  rating: number;
  distance: string;
  amenities: string[];
  type: string;
};

const CreateHotel = () => {

  const [photoArray, setPhotoArray] = useState<File[]>([]);

  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { register, handleSubmit, watch, formState: { errors } } = useForm<CreateHotelFormType>({
    defaultValues: {
      name: "",
      title: "",
      description: "",
      address: "",
      price: 0,
      city: "",
      rating: 0,
      distance: '',
      amenities: [],
      type: "",
    }
  });
  const selectType = watch('type');
  const selectAmenities = watch("amenities", []) || [];

  const onSubmit = async (data: CreateHotelFormType) => {
    // Build CreateHotelType object



    const formData = new FormData();



    Object.entries(data).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((item) => formData.append(key, item));
      } else {
        formData.append(key, String(value));
      }
    });




    try {
      console.log('creating hotel...')
      setLoading(true)

      const res = await fetch(base_url + "/api/hotel/create-hotel", {
        method: "POST",
        body: formData

      });
      const data = await res.json();
      if (!res.ok && data.success === false) {
        throw new Error(data.message);
      }


      console.log(data.message);
      // navigate("/admin/hotels")
      setLoading(false)
    } catch (error) {

      console.log(error);
      throw new Error("Failed to create !")
    } finally {

      setLoading(false)

    }


  };


  return (
    // <HotelCreateForm
    //   hotel={hotel}
    //   setHotel={setHotel}
    //   setPhotoArray={setPhotoArray}
    //   amenities={amenities}
    //   setAmenities={setAmenities}
    //   loading={loading}
    //   handleSubmit={handleSubmit}
    //   type="create"
    // />
    <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" className=" bg-white border py-8 px-4 md:px-6 min-w-96  mx-auto mt-20 flex flex-col gap-4 font-roboto">
      {
        hotelInputValidation.map(field => (
          <div className="flex flex-col gap-1 " key={field.name}>
            <label htmlFor={field.name} className="capitalize font-medium text-lg">

              {field.label}
            </label>
            <input
              type="text"
              {...register(field.name as keyof CreateHotelFormType, field.config)}
              placeholder={field.placeholder}
              className="input_con"
            />
            {
              errors[field.name] && <p className="error_message ">{errors[field.name]?.message as string}</p>
            }

          </div>
        ))

      }
      <div className="flex flex-col gap-1">
        <label htmlFor="description" className="font-roboto text-lg font-medium">Description</label>
        <textarea
          placeholder="Description"
          {...register("description", { required: "Description is required." })}
          className="min-h-20 bg-neutral-100 focus:outline-blue-400 p-2" />
        {
          errors.description && <p className="error_message" >{errors.description.message as string}</p>
        }
      </div>

      {/* Hotel type */}
      <div className="space-y-2">
        <h2 className="font-roboto text-lg font-medium">Type</h2>
        <div className="flex flex-wrap gap-4">

          {
            hotelTypes.map((field) => (<label htmlFor={field}
              key={field}
              className={`font-roboto px-4 py-2 rounded-lg cursor-pointer shadow ${selectType === field ? "bg-blue-400 text-white" : "bg-neutral-100"}`}
            >
              {field}
              <input type="radio" id={field} value={field} {...register("type", { required: "Type is required." })} className="hidden" />

            </label>))
          }

        </div>
        {
          errors.type && <p className="error_message">{errors.type.message as string}</p>
        }

      </div>

      {/* Select hotel amenites */}
      <div className="space-y-2">
        <h2 className="font-roboto text-lg font-medium">Amenities</h2>
        <div className="flex flex-wrap gap-4 ">


          {
            hotelAmenities.map(field => (
              <label htmlFor={field.label} key={field.label} className="flex items-center justify-center gap-1 text-lg cursor-pointer ">

                <input type="checkbox"
                  value={field.value}
                  id={field.label}
                  checked={selectAmenities.includes(field.value)}
                  {...register("amenities", { required: "This field is required." })}


                  className="w-4 h-4" />
                {field.value}
              </label>
            ))
          }
        </div>

        {
          errors.amenities && <p className="error_message">{errors.amenities.message as string}</p>
        }
      </div>

      <input
        type="file"
        name="photos"
        multiple
        onChange={e => setPhotoArray(e.target.files ? Array.from(e.target.files) : [])}
        className="input_con"
      />
      <button className="btn " type="submit">Post</button>
    </form>
  );
};
export default CreateHotel
