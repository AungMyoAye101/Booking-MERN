import * as z from "zod";

export const bookingSchema = z.object({
    userId: z.string(),
    roomId: z.string(),
    hotelId: z.string(),
    totalPrice: z.number().positive(),
    quantity: z.number().positive,
    status: z.enum(["PENDING", "CONFIRMED", "CANCELLED", "EXPIRED"]),
    checkIn: z.date(),
    checkOut: z.date()
})

export type bookingType = z.infer<typeof bookingSchema>