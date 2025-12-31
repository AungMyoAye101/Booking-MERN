import {faker} from "@faker-js/faker";
import mongoose from "mongoose";
import { connectToDb } from "../utils/connectToDb";
import User from "../models/user.model";

const seed = async () => {
connectToDb();
await User.deleteMany();
console.log("Deleting users...");
    const users = Array.from({length: 20}, () => ({
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: "$2b$10$qogYISQz2MTVo6lEs8XkSOewjpsTZp3frP6JLuDgPdPA2i6qnZAsC",
        city: faker.location.city(),
        country: faker.location.country(),
        phone: faker.phone.number(),
    }));
    await User.insertMany(users);
    console.log("Users seeded successfully");
}

seed();