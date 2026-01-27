import * as z from "zod";



export const HotelQuerySchema = z.object({
    destination: z
        .string()
        .trim()
        .min(1, "Destination must be at least 1 characters.")
        .max(100)
        .optional(),

    minPrice: z
        .coerce
        .number()
        .min(0)
        .default(0),

    maxPrice: z
        .coerce
        .number()
        .max(10000)
        .default(1000),
    type: z
        .enum(["hotel", "motel", "guest-house"],
            "Type must be one of hotel,motel or guest house."
        )
        .optional(),

    stars: z
        .union([
            z.array(z.coerce.number().int().min(1).max(5)),
            z.coerce.number().int().min(1).max(5)
        ])
        .optional()
        .transform(v => (Array.isArray(v) ? v : v ? [v] : []))
        .optional(),

    priceOrder: z
        .enum(["asc", "desc"])
        .default("asc"),

    ratingOrder: z
        .enum(["asc", "desc"])
        .default("desc"),

    page: z
        .coerce
        .number()
        .int()
        .min(1)
        .default(1),

    limit: z
        .coerce
        .number()
        .int()
        .min(1)
        .max(50)
        .default(10),
})
    .refine(data => data.minPrice <= data.maxPrice, {
        message: "minPrice must be less than maxPrice",
    })

export type hotelQueryType = z.infer<typeof HotelQuerySchema>