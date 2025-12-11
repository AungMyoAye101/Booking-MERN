import "express";

declare global {
    namespace Express {
        interface Request {
            user?: any,
            cookies: { refresh_token?: string }
            validatedBody?: any,
            validatedParams?: any,
            validatedQuery?: any,

        }
    }
}