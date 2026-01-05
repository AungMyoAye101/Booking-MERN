import * as z from "zod";

export const roomSchema = z.object({
    name: z
        .string("Title is required.")
        .min(3, "Title must be contain 3 characters."),
    maxPeople: z
        .number()
        .refine((val) => val > 0, "Max people must be greater than 0."),
    price: z
        .number()
        .refine((val) => val > 0, "Price must be greater than 0."),
    totalRooms: z
        .number()
        .refine((val) => val > 0, "Room number must be greater than 0."),
    bedTypes: z
        .enum(["king", "queen", "full", "twin", "single"],
            { message: "Bed type must be one of king, queen, full, twin or single" })
})


export type createRoomType = z.infer<typeof roomSchema>;
