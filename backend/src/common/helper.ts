import mongoose from "mongoose"
import { ValidationError } from "./errors"

export const checkMongoIdValid = (
    id: string
) => {

    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ValidationError([{
            message: "Invalid mongo Id.",
            path: "id"
        }])
    }
    return id;
}

