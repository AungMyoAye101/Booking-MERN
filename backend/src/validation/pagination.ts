import * as z from "zod";
export const paginationSchmea = z.object({
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

export type paginationType = z.infer<typeof paginationSchmea>;