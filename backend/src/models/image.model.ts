import mongoose, { Document } from "mongoose";

export interface IImage extends Document {
    url: string,
    public_id: string
}

const imageSchema = new mongoose.Schema<IImage>({
    url: {
        type: String,
        required: true,
    },
    public_id: {
        type: String,
        required: true,
    }
})

const Image = mongoose.model<IImage>("Image", imageSchema)

export default Image