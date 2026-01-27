import mongoose from "mongoose"

export const checkMongoDbId = (ids: string[]): mongoose.Types.ObjectId[] => {
    const result = ids.map((id) => {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error("Invalid mongoose Id")
        }
        return new mongoose.Types.ObjectId(id);
    })
    return result;
}