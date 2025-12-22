import * as z from "zod";

export const bookingSchema = z.object({
    userId: z.string(),
    roomId: z.string(),
    hotelId: z.string(),
    totalPrice: z.number().positive(),
    quantity: z.number().positive(),
    status: z.enum(["PENDING", "CONFIRMED", "CANCELLED", "EXPIRED"]).default("PENDING"),
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

export type bookingType = z.infer<typeof bookingSchema>