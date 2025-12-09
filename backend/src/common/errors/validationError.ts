import { CustomError } from "./customError";

interface ValidationErrorDetails {
    path: string,
    message: string
}


export class ValidationError extends CustomError {
    statusCode = 400;
    constructor(public details: ValidationErrorDetails[]) {
        super("Validation error")
    }

    generateErrors() {
        return this.details.map((detail) => ({
            message: detail.message,
            field: detail.path
        }))
    }
}