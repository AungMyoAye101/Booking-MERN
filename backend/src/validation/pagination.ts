import * as z from "zod";
export const paginationSchmea = z.object({
    page: z.number().positive().int().default(1).optional(),
    limit: z.number().positive().int().default(10).optional()
})

export type paginationType = z.infer<typeof paginationSchmea>;