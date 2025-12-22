
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
    },
    email: {
      type: String,
      required: true,


    },
    password: {
      type: String,
      required: true,
    },
    city: {
      type: String,

    },
    country: {
      type: String,
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

UserSchema.index({ email: 1 }, { unique: true, });
UserSchema.index({ createdAt: -1 });

const User = mongoose.model<IUser>("User", UserSchema);
export default User
