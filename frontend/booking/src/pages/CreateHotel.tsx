import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { base_url, spinner } from "../lib/helper";
import { useForm } from "react-hook-form";
import { hotelAmenities, hotelInputValidation, hotelTypes } from "../config/createHotel";
import { showToast } from "../context/ToastProvider";
import { FaX } from "react-icons/fa6";
import { MdOutlineCloudUpload } from "react-icons/md";


export interface CreateHotelFormType {
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
  const [previewImg, setPreviewImg] = useState<string[]>([])
  const [errorMessage, setErrorMessage] = useState()

  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { register, handleSubmit, watch, formState: { errors } } = useForm<CreateHotelFormType>();
  const selectType = watch('type');
  const selectAmenities = watch("amenities", []) || [];

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {

      const photos = Array.from(files)
      setPhotoArray(pre => [...pre, ...photos])
      const preview = photos.map((img) => URL.createObjectURL(img))
      setPreviewImg(preview)
    }
  }

  const removePhoto = (i: number) => {
    const images = [...photoArray]
    const previewImages = [...previewImg]
    images.splice(i, 1)
    previewImages.splice(i, 1)
    setPreviewImg(previewImages)
    setPhotoArray(images)
  }

  // Upload form data to server
  const onSubmit = handleSubmit(async (data) => {
    console.log(data)
    const formData = new FormData();
    // Add data object with key ,value pair
    Object.entries(data).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((item) => formData.append(key, item));
      } else {
        formData.append(key, String(value));
      }
    });
    photoArray.forEach(img => formData.append("photos", img))

    try {
      setLoading(true)

      const res = await fetch(base_url + "/api/hotel/create-hotel", {
        method: "POST",
        body: formData

      });
      const data = await res.json();
      if (!res.ok || data.success === false) {
        setErrorMessage(data.message)
        showToast("error", data.message)
        throw new Error(data.message);
      }


      showToast("success", data.message)
      navigate("/admin/hotels")
      setLoading(false)
    } catch (error) {

      console.log(error);
      throw new Error("Failed to create !")
    } finally {

      setLoading(false)

    }


  });


  return (
    <form onSubmit={onSubmit} encType="multipart/form-data" className=" bg-white border py-8 px-4 md:px-6 min-w-96  mx-auto mt-20 flex flex-col gap-4 font-roboto">
      <h1 className="font-roboto text-2xl md:text-3xl font-bold text-center">Create Hotel Form</h1>
      {
        errorMessage && <p className="text-center text-red-400 font-roboto">{errorMessage}</p>
      }
      {
        hotelInputValidation.map(field => (
          <div className="flex flex-col gap-1 " key={field.name}>
            <label htmlFor={field.name} className="capitalize font-medium text-lg">

              {field.label}
            </label>
            <input
              type={field.name === "price" ? "number" : "text"}
              {...register(field.name as keyof CreateHotelFormType, field.config)}
              placeholder={field.placeholder}
              className="input_con"
            />
            {
              errors[field.name as keyof CreateHotelFormType] && <p className="error_message ">{errors[field.name as keyof CreateHotelFormType]?.message as string}</p>
            }

          </div>
        ))

      }
      {/* Description */}
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
      {/* Rating */}
      <div>
        <h2 className="font-roboto text-lg font-medium">Rating</h2>
        <div className="flex gap-4">


          {
            [1, 2, 3, 4, 5].map(item => (
              <label key={item} htmlFor={item.toString()} className="text-lg font-roboto font-medium ">

                <input
                  type="radio"
                  id={item.toString()}
                  value={item}
                  {...register("rating", { required: "Rating is required." })}
                  className="w-4 h-4 mr-1"
                />
                {item}
              </label>
            ))
          }
        </div>
        {
          errors.rating && <p className="error_message">{errors.rating.message as string}</p>
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
              <label htmlFor={field.label} key={field.label} className="flex items-center justify-center gap-2 cursor-pointer ">

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

      <div className="flex items-center flex-wrap gap-4">
        <div>
          <label htmlFor="photos" className="w-60 h-40 rounded-lg bg-neutral-200 border border-gray-300 hover:border-blue-400 flex justify-center items-center">
            <MdOutlineCloudUpload className="text-4xl" />
          </label>
          <input
            type="file"
            name="photos"
            id="photos"
            multiple
            onChange={handlePhotoChange}
            className="hidden"
          />
        </div>
        {
          previewImg.length > 0 && previewImg.map((img, i) => (
            <div key={i} className="relative">

              <img src={img} alt="preview photo" className="w-60 h-40 rounded-lg" />
              <div
                onClick={() => removePhoto(i)}
                className="absolute top-1 right-1 bg-white text-red-500 font-semibold text-xl border border-gray-400 hover:border-red-500 w-10 h-10 rounded-full z-10 flex justify-center items-center cursor-pointer"><FaX /></div>
            </div>
          ))
        }
      </div>
      <button disabled={loading} className={`btn w-20 h-10  flex justify-center items-center self-end ${loading ? "cursor-not-allowed" : "cursor-pointer"}`} type="submit">{loading ? spinner : "Create"}</button>
    </form>
  );
};
export default CreateHotel
