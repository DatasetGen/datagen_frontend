import axios from "axios";
import { QueryClient } from "@tanstack/react-query";

export const apiClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api/v1/`,
});

apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Token ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnMount: false,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
            refetchIntervalInBackground: false,
        },
    },
});
