import * as z from "zod";
import { paginationSchmea } from "./pagination";

export const searchSchema = z.object({
    search: z.string().trim().max(25, "Serach cannot be long 25 characters.").optional()
})

export const hotelSerachSchema = z.object({
    search: z
        .string()
        .trim()
        .max(25, "Serach cannot be long 25 characters.")
        .optional(),
    city: z
        .string()
        .trim()
        .max(12, "City cannot be long 12 characters.")
        .optional(),
    type: z
        .enum(['hotel', 'motel', 'guest-house'],
            "Type must be one of hotel,motel or guest house.")
        .optional(),
    min_rating: z
        .coerce.number()
        .int()
        .positive()
        .min(1, "Rating must be grather than 1.")
        .max(10, "Rating cannot be grather than 10.")
        .optional(),
    max_rating: z
        .coerce.number()
        .int()
        .positive()
        .min(1, "Rating must be grather than 1.")
        .max(10, "Rating cannot be grather than 10.")
        .optional(),
    min_star: z
        .coerce.number()
        .int()
        .positive()
        .min(1, "Star must be grather than 1.")
        .max(5, "Star cannot be grather than 5.")
        .optional(),
    max_star: z
        .coerce.number()
        .int()
        .positive()
        .min(1, "Star must be grather than 1.")
        .max(5, "Star cannot be grather than 5.")
        .optional(),
    min_price: z
        .coerce.number()
        .int()
        .positive()
        .min(1, "Price must be grather than 1.")
        .optional(),
    max_price: z
        .coerce.number()
        .int()
        .positive()
        .min(1, "Price must be grather than 1.")
        .optional(),



}).merge(paginationSchmea);