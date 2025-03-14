import { z } from "zod";

export const loginUserValidation = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "password contain at least 6 character" })
    .max(12, { message: "password doesn't exceed 12 character" }),
});
export const signUpUserValidation = z.object({
  name: z
    .string()
    .min(3, { message: "username contain at least 6 character" })
    .max(12, { message: "username doesn't exceed 12 character" }),
  password: z
    .string()
    .min(6, { message: "password contain at least 6 character" })
    .max(12, { message: "password doesn't exceed 12 character" }),
  email: z.string().email(),
});
export const createHotelValidation = z.object({
  name: z
    .string()
    .min(3, { message: "Hotel name contain at least 6 character" })
    .max(24, { message: "Hotel name doesn't exceed 12 character" }),
  title: z
    .string()
    .min(6, { message: "hotel title contain at least 6 character" })
    .max(24, { message: "hotel title doesn't exceed 12 character" }),
  type: z
    .string()
    .nonempty({ message: "Please select a type" })
  ,
  rating: z
    .string()
    .min(1, { message: "Please provide a star rating" })
  ,
  description: z
    .string()
    .min(12, { message: "Description contain at least 12 character" }),

  address: z
    .string()
    .min(6, { message: "Address contain at least 6 character" }),

  photos: z
    .string()
    .array()
    .min(1, { message: "Please add a photo" }),
  distance: z
    .string()
    .min(3, { message: "Please add a distance" }),
  city: z.string().min(3, { message: "City contain at least 6 character" }),

  price: z.number().min(1, { message: "Please provide a price" }),
});
