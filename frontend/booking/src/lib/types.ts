export interface HotelType {
  _id: string;
  name: string;
  title: string;
  description: string;
  photos: string[];
  address: string;
  price: number;
  city: string;
  distance: string;
  rating: number;
  rooms: RoomType[];
  type: string;
  amenities: string[];
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


export interface RoomType {
  _id: string;
  title: string,
  description: string,
  price: number,
  maxPeople: number,
  roomNumber?: [{ number: number, availableDate: Date }]
}
