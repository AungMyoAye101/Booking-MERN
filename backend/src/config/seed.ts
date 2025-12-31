import {faker} from "@faker-js/faker";
import { connectToDb } from "../utils/connectToDb";
import User from "../models/user.model";
import { hashPassword } from "../common/password";
import Admin from "../models/admin.model";




const seed = async () => {
connectToDb();
const password = await hashPassword("user123");
// 
// await User.deleteMany();
// console.log("Deleting users...");
//     const users = Array.from({length: 20}, () => ({
//         name: faker.person.fullName(),
//         email: faker.internet.email(),
//         password: password,
//         city: faker.location.city(),
//         country: faker.location.country(),
//         phone: faker.phone.number(),
//     }));
//     await User.insertMany(users);
//     console.log("Users seeded successfully");
const passwordAdmin = await hashPassword("admin123");
const admins = [
    {
        name: "Admin",
        email: "admin@gmail.com",
        password: passwordAdmin,
        role: "admin",
    },
    {
        name: "Staff",
        email: "staff@gmail.com",
        password: passwordAdmin,
        role: "staff",  
    }
]
    await Admin.deleteMany();
    console.log("Deleting admins...");
    await Admin.insertMany(admins);
    console.log("Admins seeded successfully");
}

seed();