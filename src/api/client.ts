import axios from "axios";
import { QueryClient } from "@tanstack/react-query";

export const apiClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api/v1/`,
});

export const aiClient = axios.create({
  baseURL: `${import.meta.env.VITE_AI_API_URL}/`,
})

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
        },
    },
});
