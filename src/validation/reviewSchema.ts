import * as z from "zod";

export const createReviewSchema = z.object({
    userId: z.string(),
    hotelId: z.string(),
    review: z.string(),
    rating: z.number(),
})
export const updateReviewSchema = z.object({
    review: z.string().optional(),
    rating: z.number().optional(),
})

export type createReviewType = z.infer<typeof createReviewSchema>
export type updateReviewType = z.infer<typeof updateReviewSchema>