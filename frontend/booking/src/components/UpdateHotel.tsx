
import { useNavigate, useParams } from "react-router-dom";


import { useEffect, useState } from "react";
import { MdOutlineCloudUpload } from "react-icons/md";
import { showToast } from "../context/ToastProvider";
import { useForm } from "react-hook-form";
import { CreateHotelFormType } from "../pages/CreateHotel";
import { base_url, spinner } from "../lib/helper";
import { hotelAmenities, hotelInputValidation, hotelTypes } from "../config/createHotel";
import { FaX } from "react-icons/fa6";

const UpdateHotel = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false)
  const [photoArray, setPhotoArray] = useState<File[]>([]);
  const [previewImg, setPreviewImg] = useState<string[]>([])
  const [errorMessage, setErrorMessage] = useState()

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<CreateHotelFormType>();
  const selectType = watch('type');
  const selectAmenities = watch("amenities", []) || [];


  const navigate = useNavigate()



  useEffect(() => {
    const fetchHotel = async () => {
      const res = await fetch(`http://localhost:5000/api/hotel/${id}`);
      const { data } = await res.json();
      Object.entries(data).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          setValue(key as keyof CreateHotelFormType, value);
        } else {
          setValue(key as keyof CreateHotelFormType, String(value));
        }
      });
      setPreviewImg(data.photos);
    };
    fetchHotel()
  }, []);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {

      const photos = Array.from(files)
      setPhotoArray(photos)
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


  // const handleSubmit = async (e: React.FormEvent) => {

  //   e.preventDefault();


  //   setHotel((pre) => ({ ...pre, amenities: amenities, photos: photoArray.filter((item: any): item is string => typeof item === "string") }));

  //   if (hotel.photos.length === 0) return

  //   // const validateHotel = createHotelValidation.safeParse(hotel);
  //   // if (!validateHotel.success) {
  //   //   console.log(validateHotel.error);
  //   //   return;
  //   // }

  //   try {
  //     console.log('updating hotel...')
  //     setLoading(true)

  //     const res = await fetch(`http://localhost:5000/api/hotel/${id}`, {
  //       method: "PUT",
  //       headers: { "Content-Type": "application/json", },
  //       body: JSON.stringify(hotel),
  //     });
  //     if (!res.ok) {
  //       throw new Error("Failed to create hotel");
  //     }

  //     const data = await res.json();
  //     console.log("hotel updated successfullly", data);
  //     navigate("/admin/hotels")
  //     setLoading(false)

  //   }
  //   catch (error) {

  //     console.log(error);
  //     setLoading(false)
  //     throw new Error("Failed to update !")
  //   } finally {

  //     setLoading(false)
  //   }


  // };
  const onSubmit = handleSubmit(async (data) => {

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

      const res = await fetch(base_url + `/api/hotel/${id}`, {
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
      <button disabled={loading} className="btn flex justify-center items-center self-end " type="submit">{loading ? spinner : "Update"}</button>
    </form>
  )

};

export default UpdateHotel;
