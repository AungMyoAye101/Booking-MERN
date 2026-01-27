import * as z from "zod";

export const registerSchema = z.object({
    name: z.string("Name is required."),
    email: z.email("Invalid email."),
    password:
        z.string("Password is required.")
            .min(6, "Password must be at least 6 charaters long.")
});
export const loginSchema = z.object({
    email: z.email("Invalid email."),
    password:
        z.string("Password is required.")
            .min(6, "Password must be at least 6 charaters long.")
});
export const IDSchema = z.object({
    id: z.string("ID is required.")
})

export type registerType = z.infer<typeof registerSchema>
export type loginType = z.infer<typeof loginSchema>