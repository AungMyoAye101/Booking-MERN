import { CustomError } from "./customError";

export class UnAuthorizedError extends CustomError {
    statusCode = 401;
    constructor(public message: string) {
        super(message)
    }
    generateErrors() {
        return [{ message: this.message }]
    }
}