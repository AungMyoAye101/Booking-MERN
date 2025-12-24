import * as z from "zod";

export const searchSchema = z.object({
    search: z.string().trim().max(25, "Serach cannot be long 25 characters.").optional()
})