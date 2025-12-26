import { getHotelByTypes } from "@/services/home_service"
import { useQuery } from "@tanstack/react-query"

export const useGetHotelByTypes = async () => {
    return useQuery({
        queryKey: ["hotel_types"],
        queryFn: getHotelByTypes
    })
}