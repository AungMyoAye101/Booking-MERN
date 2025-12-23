import * as z from "zod";

export const createPaymentSchema = z.object({
    bookingId: z.string("Booking id is required."),
    userId: z.string("User  id is required."),
    paymentMethod: z.enum(["MOBILE_BANKING", "CARD", "BANK"],
        "Payment method must be one of Mobile banking ,card or bank."),
    amount: z.number().positive()
})

export const updatePaymnetSchema = z.object({
    userId: z.string("User  id is required."),
    paymentId: z.string("Payment  id is required."),
    bookingId: z.string("Booking id is required."),
})

export type createPaymentType = z.infer<typeof createPaymentSchema>;
export type updatePaymentType = z.infer<typeof updatePaymnetSchema>;