import mongoose, { Document } from "mongoose";
export interface IUser extends Document {
  name: string,
  email: string,
  password: string,
  city: string,
  country: string,
  phone: string,
  token?: string,

}
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      index: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      index: true
    },
    country: {
      type: String,
      index: true
    },
    phone: {
      type: String,
    },
    token: {
      type: String,
      select: false
    }
    ,
  },
  { timestamps: true }
);

const User = mongoose.model<IUser>("User", UserSchema);
export default User
