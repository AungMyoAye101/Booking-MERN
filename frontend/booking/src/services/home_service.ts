import { axiosInstance } from "./api_client"

export const getHotelByTypes = async () => {
    const { data } = await axiosInstance.get('/hotel/types');
    if (!data.success) {
        throw new Error("Failed to fetch hotel by types.")
    }

    return data;
}