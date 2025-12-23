import * as z from "zod";

export const createPaymentSchema = z.object({
    bookingId: z.string("Booking id is required."),
    userId: z.string("Booking id is required."),
    paymentMethod: z.enum(["MOBILE_BANKING", "CARD", "BANK"],
        "Payment method must be one of Mobile banking ,card or bank."),
    amount: z.number().positive()
})

export type createPaymentType = z.infer<typeof createPaymentSchema>;