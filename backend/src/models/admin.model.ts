import mongoose, { Document } from "mongoose";
export interface IAdmin extends Document {
    name: string,
    email: string,
    password: string,
    role: "admin" | "staff"
}
const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            required: true,
            default: "staff",
        }
    },
    { timestamps: true }
);

const Admin = mongoose.model<IAdmin>("User", UserSchema);
export default Admin;
