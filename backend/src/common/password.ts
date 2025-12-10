import bcrypt from "bcryptjs";
export const hashPassword = (password: string) => {
    return bcrypt.hash(password, 10)
}
export const comparedPassword = (
    newPassword: string,
    password: string
) => {
    return bcrypt.compare(newPassword, password)
}