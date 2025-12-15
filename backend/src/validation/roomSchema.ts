import * as z from "zod";

export const roomSchema = z.object({
    title: z.string("Title is required.").min(3, "Title must be contain 3 characters."),
    description: z.string("Description is required.").min(10, "Description must be contain 10 characters."),
    maxPeople: z.number().int().positive().default(1),
    price: z.number().int().positive(),
    roomNo: z.number().int().positive(),
})


export type createRoomType = z.infer<typeof roomSchema>;