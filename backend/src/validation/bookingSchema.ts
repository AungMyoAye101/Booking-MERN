import * as z from "zod";
import { paginationSchmea } from "./pagination";

export const bookingSchema = z.object({
    userId: z.string(),
    roomId: z.string(),
    hotelId: z.string(),
    totalPrice: z.number().positive(),
    quantity: z.number().positive(),
    status: z.enum(["PENDING", "CONFIRMED", "STAYED", "CANCELLED", "EXPIRED"]).default("PENDING"),
    checkIn: z.coerce.date().refine((date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return date >= today;
    }, "Check-in cannot be in the past."),
    checkOut: z.coerce.date()
}).refine((date) => date.checkOut > date.checkIn, {
    message: "Check out must be at least one day after check-in",
    path: ['checkOut']
})
export const updateBookingSchema = z.object({
    status: z.enum(["PENDING", "CONFIRMED", "STAYED", "CANCELLED", "EXPIRED"]).default("PENDING"),
})

export const bookingQuerySchema = z.object({
    status: z.preprocess(
        (val) => (val === "" || val === "null" ? undefined : val),
        z.enum(["PENDING", "CONFIRMED", "STAYED", "CANCELLED", "EXPIRED"]).optional()
    ),
    sort: z.enum(['asc', 'desc'], {
        message: "Sorting must be asc or desc"
    }).optional(),
    checkIn: z.coerce.date().optional(),
    checkOut: z.coerce.date().optional()

}).merge(paginationSchmea)

export type bookingType = z.infer<typeof bookingSchema>
export type updateBookingType = z.infer<typeof updateBookingSchema>
export type bookingQueryType = z.infer<typeof bookingQuerySchema>;