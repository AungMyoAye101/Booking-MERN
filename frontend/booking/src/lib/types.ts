export interface HotelType {
  _id: string;
  name: string;
  title: string;
  description: string;
  photos: string[];
  address: string;
  price: number;
  city: string;
  distance: "";
  featured: boolean;
  rating: number;
  rooms: string[];
  type: string;
}
export interface CreateHotelType {
  name: string;
  title: string;
  description: string;
  photos: string[];
  address: string;
  price: number;
  rating: number;
  city: string;
  distance: string;
  type: string;
  amenities: string[]
}
export interface UserType {
  _id: string;
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
}
export interface CreateUserType {
  name: string;
  email: string;
  password: string;
}
