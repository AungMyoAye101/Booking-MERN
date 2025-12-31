import * as z from "zod";
import { paginationSchmea } from "./pagination";

export const userSchmea = z.object({
    name: z
        .string()
        .min(3, "Name must be contain 3 characters.")
        .optional(),
    email: z
        .email("Inavlid email")
        .transform(v => v.toLocaleLowerCase())
        .optional(),
    city: z
        .string()
        .min(1, "City is required.")
        .optional(),
    country: z
        .string()
        .min(1, "Country is required.")
        .optional(),
    phone: z
        .string()
        .regex(/^\+?[1-9]\d{7,14}$/, "Invalid phone number")
        .optional(),
})

export const userQuerySchema = z.object({
    search: z.string().optional(),
    sort: z.enum(["asc", "desc"]).optional().default("desc"),
}).merge(paginationSchmea);

export type userType = z.infer<typeof userSchmea>;
export type userQueryType = z.infer<typeof userQuerySchema>;
