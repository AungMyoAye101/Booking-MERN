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

export const avaliableRoomSchema = z.object({
    checkIn: z
        .iso.datetime("CheckIn must be valid date string.")
        .optional(),
    checkOut: z
        .iso.datetime("CheckOut must be valid date string.")
        .optional(),
    guest: z
        .string()
        .regex(/^\d+$/, "Guset must be number.")
        .transform(Number)
        .refine((val) => val > 0, "Guest must be greater than 1 person.")
        .optional(),
    page: z
        .string()
        .regex(/^\d+$/, "Page must be number.")
        .transform(Number)
        .refine((val) => val > 0, "Page must be greater than 0.")
        .optional()
        .default(1),
    limit: z
        .string()
        .regex(/^\d+$/, "Limit must be number.")
        .transform(Number)
        .refine((val) => val > 0, "Limit must be greater than 0.")
        .optional()
        .default(10)
})

export type createRoomType = z.infer<typeof roomSchema>;
export type avaliableRoomQueryType = z.infer<typeof avaliableRoomSchema>;
