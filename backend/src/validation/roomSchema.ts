import * as z from "zod";

export const roomSchema = z.object({
    title: z
        .string("Title is required.")
        .min(3, "Title must be contain 3 characters."),
    description: z
        .string("Description is required.")
        .min(10, "Description must be contain 10 characters."),
    type: z
        .string("Type is required.")
        .min(3, "Type must be contain 3 characters."),
    maxPeople: z
        .number()
        .refine((val) => val > 0, "Max people must be greater than 0."),
    price: z
        .number()
        .refine((val) => val > 0, "Price must be greater than 0."),
    roomNo: z
        .number()
        .refine((val) => val > 0, "Room number must be greater than 0."),
})


export type createRoomType = z.infer<typeof roomSchema>;