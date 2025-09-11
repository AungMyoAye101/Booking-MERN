
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { MdOutlineCloudUpload } from "react-icons/md";
import { showToast } from "../context/ToastProvider";
import { useForm } from "react-hook-form";
import { base_url, spinner } from "../lib/helper";
import { hotelAmenities, hotelInputValidation, hotelTypes } from "../config/createHotel";
import { FaX } from "react-icons/fa6";
import { CreateHotelFormType, ImageType } from "../lib/types";

interface UpdateHotelType extends CreateHotelFormType {
  reviews: any[],
  rooms: any[],

}

const UpdateHotel = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false)
  const [photoArray, setPhotoArray] = useState<File[]>([]);
  const [previewImg, setPreviewImg] = useState<string[]>([])
  const [existingPhotos, setExistingPhotos] = useState<ImageType[]>([])
  const [errorMessage, setErrorMessage] = useState()
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<UpdateHotelType>();
  const selectType = watch('type');
  const selectAmenities = watch("amenities", []) || [];
  const navigate = useNavigate()



  useEffect(() => {
    const fetchHotel = async () => {
      const res = await fetch(`${base_url}/api/hotel/${id}`);
      const { data } = await res.json();
      Object.entries(data).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          setValue(key as keyof UpdateHotelType, value);
        } else {
          setValue(key as keyof UpdateHotelType, String(value));
        }
      });
      setExistingPhotos(data.photos)
    };
    fetchHotel()
  }, []);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {

      const photos = Array.from(files)
      setPhotoArray([...photoArray, ...photos])
      const preview = photos.map((img) => URL.createObjectURL(img))
      setPreviewImg([...previewImg, ...preview])
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



  const onSubmit = handleSubmit(async (data) => {
    if (photoArray.length > 4) {
      showToast('info', "Photo reached maximum rate.")
      return;
    }
    const { rooms, reviews, ...updatedData } = data


    const formData = new FormData();
    // Add data object with key ,value pair
    Object.entries(updatedData).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((item) => formData.append(key, item));
      } else {
        formData.append(key, String(value));
      }
    });
    existingPhotos.forEach(photo => (formData.append("existingPhotos", photo.secure_url)))
    photoArray.forEach(img => formData.append("photos", img))

    try {
      setLoading(true)

      const res = await fetch(`${base_url}/api/hotel/${id}`, {
        method: "PUT",
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
      throw new Error("Failed to update!")
    } finally {

      setLoading(false)

    }
  });


  return (
    <form onSubmit={onSubmit} encType="multipart/form-data" className=" bg-white border py-8 px-4 md:px-6 min-w-72  mx-auto mt-20 flex flex-col gap-4 font-roboto">
      <h1 className="font-roboto text-2xl md:text-3xl font-bold text-center">Update Hotel Form</h1>
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

      <div className="flex flex-col gap-2">
        <h2 className="font-roboto text-lg font-medium">Upload Photo</h2>
        {
          photoArray.length > 4 ? <p className="text-sm font-roboto text-red-500 ">Photos are reached maximun rate.</p> : <p className="text-sm font-roboto ">You can upload up to 4 photos</p>
        }
        <div className="flex flex-wrap gap-4">


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
              disabled={photoArray.length > 4}
            />
          </div>
          {
            existingPhotos.map((img, i) => (
              <div key={i} className="relative">

                <img src={img.secure_url} alt="preview photo" className="w-60 h-40 rounded-lg" />
                <div
                  onClick={() =>

                    setExistingPhotos(existingPhotos.filter(url => url !== img))
                  }
                  className="absolute top-1 right-1 bg-neutral-200 text-red-500 font-semibold  shadow hover:border-red-500 w-8 h-8 rounded-full z-10 flex justify-center items-center cursor-pointer"><FaX /></div>
              </div>
            ))
          }

          {
            previewImg.length > 0 && previewImg.map((img, i) => (
              <div key={i} className="relative">

                <img src={img} alt="preview photo" className="w-60 h-40 rounded-lg" />
                <div
                  onClick={() => removePhoto(i)}
                  className="absolute top-1 right-1 bg-neutral-200 text-red-500 font-semibold shadow hover:border-red-500 w-6 h-6 rounded-full z-10 flex justify-center items-center cursor-pointer"><FaX /></div>
              </div>
            ))
          }
        </div>
      </div>
      <button disabled={loading} className={`btn w-20 h-10  flex justify-center items-center self-end ${loading ? "cursor-not-allowed" : "cursor-pointer"}`} type="submit">{loading ? spinner : "Update"}</button>
    </form>
  )

};

export default UpdateHotel;
