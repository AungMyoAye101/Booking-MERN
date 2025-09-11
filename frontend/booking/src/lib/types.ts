export interface ImageType {
  secure_url: string,
  public_id: string,
}
export interface CreateHotelFormType {
  name: string;
  title: string;
  description: string;
  address: string;
  price: number;
  city: string;
  rating: number;
  distance: string;
  amenities: string[];
  type: string;
};
export interface HotelType {
  _id: string;
  name: string;
  title: string;
  description: string;
  photos: ImageType[];
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
  isAdmin: boolean;
}
export interface CreateUserType {
  name: string;
  email: string;
  password: string;
  confirmPassword: string
}
export interface LoginUserType {

  email: string;
  password: string;

}


export interface RoomType {
  _id: string;
  title: string,
  description: string,
  price: number,
  maxPeople: number,
  roomNumbers: [{ number: number, booking: [Date] }]
}

export interface ReviewFormType {
  review: string,
  ratings: number,
  hotelId: string,
  userId: string
}
export interface ReviewType {
  review: string,
  ratings: number,
  hotelId: string,
  userId: {
    name: string,
    email: string,
  }
}