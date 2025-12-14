import * as z from "zod";

;
export const hotelSchema = z.object({
    name: z.string("Name is required.")
        .min(3, "Name must be at least 3 characters ."),
    title: z.string("Title is required.")
        .min(3, "Title must be at least 3 characters ."),
    description: z.string("Title is required.")
        .min(10, "Description must be at least 10 characters ."),
    rating: z.number()
        .min(1, "Rating must be greater than 1.")
        .max(10, "Rating must be lower than 10.")
        .default(1),
    star: z.number()
        .min(1, "Star must be greater than 1.")
        .max(5, "Star must be lower than 5.")
        .default(1),
    type: z.enum(["hotel", "motel", "guest-house"]
        , "Type must be one of hotel, motel or guest house.")
        .default("hotel"),
    address: z.string("Title is required.")
        .min(3, "must be at least 3 characters ."),
    price: z.number("Price is required.")
        .positive("Price must be positive.").min(1, "Price must be greater than 1."),
    amenities: z.array(z.string().min(1))
        .nonempty("Amenities can't be empty."),
    distance: z.string("Title is required.")
        .min(3, "must be at least 3 characters ."),
    city: z.string("Title is required.")
        .min(3, "must be at least 3 characters ."),

})

export const hotelIdSchema = z.object({
    imageId: z.string("Image id is required."),
    hotelId: z.string("Hotel id is required.")
})

export type hotelType = z.infer<typeof hotelSchema>
