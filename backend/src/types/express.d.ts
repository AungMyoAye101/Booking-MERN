import "express";

declare global {
    namespace Express {
        interface Request {
            user?: any,
            validatedBody?: any,
            validatedParams?: any,
            validatedQuery?: any,

        }
    }
}