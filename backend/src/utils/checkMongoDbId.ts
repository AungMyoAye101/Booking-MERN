import mongoose from "mongoose"

export const checkMongoDbId = (ids: string[]): string[] => {
    const result = ids.map((id) => {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error("Invalid mangoose Id")
        }
        return id;
    })
    return result;
}