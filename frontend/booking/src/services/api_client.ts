import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_API_URI

export const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-type": "application/json"
    },
    withCredentials: true
})