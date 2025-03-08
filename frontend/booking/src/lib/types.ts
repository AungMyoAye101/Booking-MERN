export interface HotelType {
  _id: string;
  name: string;
  title: string;
  description: string;
  photos: string[];
  address: string;
  cheapestPrice: number;
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
  cheapestPrice: number;
  city: string;
  distance: string[];
  type: string;
}
export interface UserType {
  name: string;
  email: string;
  password: string;

}
export interface CreateUserType {
  name: string;
  email: string;
  password: string;
}
