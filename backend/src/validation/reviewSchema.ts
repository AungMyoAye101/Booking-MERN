import * as z from "zod";

export const reviewSchema = z.object({
    userId: z.string(),
    hotelId: z.string(),
    review: z.string(),
    rating: z.number(),
})

export type createReviewType = z.infer<typeof reviewSchema>