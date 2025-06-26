# 🏨 MERN Hotel Booking App

A full-featured hotel booking application built with the MERN stack. This app supports user and admin roles, JWT-based authentication with HTTP-only cookies, secure image uploads, reviews and ratings, and advanced hotel and room filtering with pagination.

---

## 🚀 Live Demo

[🔗 Visit the App](https://bookingbyama.vercel.app/)  

---

## 🛠 Tech Stack

**Frontend:**
- React
- React Context API (for Auth and Booking state)
- React Hook Form (for form handling)
- Tailwind CSS (for UI styling)

**Backend:**
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication (with HTTP-only cookies)
- Multer + Cloudinary (for image uploads)
- dotenv, CORS

---

## 🔐 Authentication & Authorization

- JWT-based login/signup with HTTP-only cookies
- Protected routes using custom middleware
- Role-based access (`user` and `admin`)
- Admin-only dashboard to manage hotels and rooms

---

## ✨ Features

### 👥 User Features
- Sign up / Login / Logout
- Browse all hotels with pagination
- Search hotels by city,
- Filter by:
  - Min/Max price
  - Star rating (High to Low / Low to High)
  - Room availability (by check-in/check-out dates and guests)
- Book and cancel hotel rooms
- Leave reviews and ratings for hotels

### 🛠 Admin Features
- View all hotels
- Create, update, and delete hotels
- Add rooms to a hotel
- Admin dashboard for hotel management

---

## 📄 Pages

- `/` – Home
- `/login` – User login
- `/signup` – User registration
- `/hotels/:id` – Hotel detail page
- `/payment` – Booking payment page
- `/dashboard` – Admin dashboard
- `/dashboard/hotels` – Hotel list (admin)
- `/dashboard/hotels/create` – Add hotel (admin)
- `/dashboard/hotels/:id/update` – Update hotel (admin)
- `/dashboard/hotels/:id/add-room` – Add room to hotel (admin)

---

## 📦 Installation

```bash
# Clone the repo
git clone https://github.com/yourusername/mern-hotel-booking.git
cd mern-hotel-booking

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend/booking
npm install
