import Admin from "../models/admin.model";
import { adminLoginType } from "../validation/auth.admin";

export const login = async (
    data: adminLoginType
) => {
    const user = await Admin.find({ email: data.email })
}