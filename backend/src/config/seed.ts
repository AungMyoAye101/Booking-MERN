import { faker } from "@faker-js/faker";
import { connectToDb } from "../utils/connectToDb";
import User from "../models/user.model";
import { hashPassword } from "../common/password";
import Admin from "../models/admin.model";
import Hotel from "../models/hotel.model";
import Room from "../models/room.model";
import Booking from "../models/booking.model";




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
    // await Hotel.deleteMany();
    // console.log("Deleting hotels...");
    // const hotels = Array.from({ length: 20 }, () => ({
    //     name: faker.company.name(),
    //     description: faker.company.catchPhrase(),
    //     address: faker.location.streetAddress(),
    //     price: faker.number.int({ min: 100, max: 1000 }),
    //     amenities: faker.helpers.arrayElements(["wifi", "parking", "pool", "gym", "breakfast"]),
    //     city: faker.location.city(),
    //     country: faker.location.country(),
    //     rating: faker.number.int({ min: 1, max: 10 }),
    //     star: faker.number.int({ min: 1, max: 5 }),
    //     type: faker.helpers.arrayElement(["hotel", "motel", "guest-house"]),
    // }));
    // await Hotel.insertMany(hotels);
    // console.log("Hotels seeded successfully");
    seedBooking()
}

const seedRoom = async () => {
    await Room.deleteMany();
    console.log("Deleting rooms...");
    const hotels = await Hotel.find();
    const rooms = Array.from({ length: 20 }, () => ({
        name: faker.company.name(),
        maxPeople: faker.number.int({ min: 1, max: 10 }),
        price: faker.number.int({ min: 100, max: 1000 }),
        totalRooms: faker.number.int({ min: 1, max: 10 }),
        bedTypes: faker.helpers.arrayElement(["king", "queen", "full", "twin", "single"]),
        hotelId: faker.helpers.arrayElement(hotels.map(hotel => hotel._id)),
    }));
    await Room.insertMany(rooms);
    console.log("Rooms seeded successfully");
}

const seedBooking = async () => {
    await Booking.deleteMany();
    console.log("Deleting bookings...");

    const users = await User.find();
    const rooms = await Room.find();

    if (users.length === 0 || rooms.length === 0) {
        console.log("Please seed users and rooms first before seeding bookings");
        return;
    }

    const bookings = Array.from({ length: 30 }, () => {
        const selectedRoom = faker.helpers.arrayElement(rooms);
        const quantity = faker.number.int({ min: 1, max: 3 });

        // Generate check-in date (between today and 30 days from now)
        const checkIn = faker.date.future({ years: 0.08 }); // ~30 days
        checkIn.setHours(14, 0, 0, 0); // Set check-in time to 2 PM

        // Generate check-out date (1-7 days after check-in)
        const nights = faker.number.int({ min: 1, max: 7 });
        const checkOut = new Date(checkIn);
        checkOut.setDate(checkOut.getDate() + nights);
        checkOut.setHours(11, 0, 0, 0); // Set check-out time to 11 AM

        // Calculate total price: room price * quantity * number of nights
        const totalPrice = selectedRoom.price * quantity * nights;

        // Generate status (mostly confirmed, some pending, few cancelled)
        const statusOptions = ["CONFIRMED", "CONFIRMED", "CONFIRMED", "PENDING", "CANCELLED"] as const;
        const status = faker.helpers.arrayElement(statusOptions);

        return {
            userId: faker.helpers.arrayElement(users.map(u => u._id)),
            roomId: selectedRoom._id,
            hotelId: selectedRoom.hotelId,
            checkIn: checkIn,
            checkOut: checkOut,
            quantity: quantity,
            totalPrice: totalPrice,
            status: status,
        };
    });

    await Booking.insertMany(bookings);
    console.log("Bookings seeded successfully");
}

seed();