import { faker } from "@faker-js/faker";
import { connectToDb } from "../utils/connectToDb";
import User from "../models/user.model";
import { hashPassword } from "../common/password";
import Admin from "../models/admin.model";
import Hotel from "../models/hotel.model";
import Room from "../models/room.model";
import Booking from "../models/booking.model";
import Payment from "../models/payment.model";




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
    // 
    seedPayment()
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

const seedPayment = async () => {
    await Payment.deleteMany();
    console.log("Deleting payments...");

    const bookings = await Booking.find();
    const users = await User.find();
    if (bookings.length === 0 || users.length === 0) {
        console.log("Please seed bookings and users before seeding payments");
        return;
    }

    // Generate payments corresponding to bookings (1:1 mapping for simplicity)
    const payments = bookings.map(booking => {
        // Randomly select a payment method and status
        const paymentMethods = ["MOBILE_BANKING", "CARD", "BANK"] as const;
        const statuses = ["PAID", "PAID", "PAID", "PENDING", "FAILED"] as const; // mostly PAID

        // Paid/failed payments should have a realistic past paidAt date, pending can be future or present
        let paidAt = new Date();
        if (faker.helpers.arrayElement([true, false])) {
            paidAt = faker.date.past({ years: 0.2 }); // within last ~2.5 months
        } else if (faker.helpers.arrayElement([true, false])) {
            paidAt = faker.date.recent({ days: 14 }); // within last 2 weeks
        }

        const status = faker.helpers.arrayElement(statuses);

        // Randomize a user for the payment (should match the booking user)
        return {
            bookingId: booking._id,
            userId: booking.userId,
            paymentMethod: faker.helpers.arrayElement(paymentMethods),
            status,
            amount: booking.totalPrice,
            paidAt,
        };
    });

    await Payment.insertMany(payments);
    console.log("Payments seeded successfully");
}

seed();