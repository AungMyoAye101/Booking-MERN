import * as z from "zod";

const adminRegisterSchema = z.object({
    name: z.string("Name is required."),
    email: z.email("Invalid email."),
    password:
        z.string("Password is required.")
            .min(6, "Password must be at least 6 charaters long.")
});
const adminLoginSchema = z.object({
    email: z.email("Invalid email."),
    password:
        z.string("Password is required.")
            .min(6, "Password must be at least 6 charaters long.")
});

export type adminRegisterType = z.infer<typeof adminRegisterSchema>
export type adminLoginType = z.infer<typeof adminLoginSchema>