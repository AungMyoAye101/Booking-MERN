import { faker } from "@faker-js/faker";
import { connectToDb } from "../utils/connectToDb";
import User from "../models/user.model";
import { hashPassword } from "../common/password";
import Admin from "../models/admin.model";
import Hotel from "../models/hotel.model";




const seed = async () => {
    connectToDb();
    // const password = await hashPassword("user123");
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
    // const passwordAdmin = await hashPassword("admin123");
    // const admins = [
    //     {
    //         name: "Admin",
    //         email: "admin@gmail.com",
    //         password: passwordAdmin,
    //         role: "admin",
    //     },
    //     {
    //         name: "Staff",
    //         email: "staff@gmail.com",
    //         password: passwordAdmin,
    //         role: "staff",  
    //     }
    // ]
    // await Admin.deleteMany();
    // console.log("Deleting admins...");
    // await Admin.insertMany(admins);
    // console.log("Admins seeded successfully");
    await Hotel.deleteMany();
    console.log("Deleting hotels...");
    const hotels = Array.from({ length: 20 }, () => ({
        name: faker.company.name(),
        title: faker.company.catchPhrase(),
        description: faker.company.catchPhrase(),
        address: faker.location.streetAddress(),
        price: faker.number.int({ min: 100, max: 1000 }),
        amenities: faker.helpers.arrayElements(["wifi", "parking", "pool", "gym", "breakfast"]),
        distance: faker.location.direction(),
        city: faker.location.city(),
        rating: faker.number.int({ min: 1, max: 10 }),
        star: faker.number.int({ min: 1, max: 5 }),
        type: faker.helpers.arrayElement(["hotel", "motel", "guest-house"]),
    }));
    await Hotel.insertMany(hotels);
    console.log("Hotels seeded successfully");
}

seed();