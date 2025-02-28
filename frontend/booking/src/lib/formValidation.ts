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
export const crateHotelValidation = z.object({
  name: z
    .string()
    .min(3, { message: "Hotel name contain at least 6 character" })
    .max(12, { message: "Hotel name doesn't exceed 12 character" }),
  title: z
    .string()
    .min(6, { message: "hotel title contain at least 6 character" })
    .max(24, { message: "hotel title doesn't exceed 12 character" }),
  desecription: z
    .string()
    .min(6, { message: "Description contain at least 6 character" }),

  address: z
    .string()
    .min(3, { message: "Address contain at least 6 character" }),

  photo: z
    .string()
    .array()
    .min(1, { message: "Photo contain at least 1 photo" }),
  distance: z
    .string()
    .array()
    .min(1, { message: "Photo contain at least 1 photo" }),
  city: z.string().min(3, { message: "City contain at least 6 character" }),

  cheapestPrice: z.number(),
});
