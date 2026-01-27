import mongoose, { Document } from "mongoose";
export interface IAdmin extends Document {
    name: string,
    email: string,
    password: string,
    role: "admin" | "staff",
    token?: string
}
const AdminSchema = new mongoose.Schema(
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
        },
        token: {
            type: String,
        }

    },
    { timestamps: true }
);

const Admin = mongoose.model<IAdmin>("Admin", AdminSchema);
export default Admin;
