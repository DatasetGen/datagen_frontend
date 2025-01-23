import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { apiClient } from './client';
import { AxiosError } from 'axios';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';

// Define a generic API error type
interface ApiError {
    status: number;
    message: string;
    details?: unknown;
}

// Generic fetch function with typed errors
const fetchData = async <TResponse>(
    endpoint: string,
    filters: Record<string, unknown> = {}
): Promise<TResponse> => {
    try {
        const response = await apiClient.get<TResponse>(endpoint, {
            params: filters,
        });
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            throw error as AxiosError<ApiError>;
        }
        throw error; // Re-throw non-Axios errors
    }
};

// Utility function for creating hooks with typed errors
export const createQueryHook = <TResponse>(
    queryKey: string,
    endpoint: string
) => {
    return (
        filters: Record<string, unknown> = {},
        options?: UseQueryOptions<TResponse, AxiosError<ApiError>>
    ) => {
        return useQuery<TResponse, AxiosError<ApiError>>({
            queryKey: [queryKey, filters],
            queryFn: () => fetchData<TResponse>(endpoint, filters),
            ...options,
        });
    };
};



// Define a generic API error type
interface ApiError {
    status: number;
    message: string;
    details?: unknown;
}

// Generic mutate function with typed errors
const mutateData = async <TBody, TResponse>(
    endpoint: string,
    body: TBody
): Promise<TResponse> => {
    try {
        const response = await apiClient.post<TResponse>(endpoint, body);
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            throw error as AxiosError<ApiError>;
        }
        throw error; // Re-throw non-Axios errors
    }
};

// Utility function for creating mutation hooks with typed errors
export const createMutationHook = <TBody, TResponse>(
    endpoint: string
) => {
    return (
        options?: UseMutationOptions<TResponse, AxiosError<ApiError>, TBody>
    ) => {
        return useMutation<TResponse, AxiosError<ApiError>, TBody>({
            mutationFn: (body: TBody) => mutateData<TBody, TResponse>(endpoint, body),
            ...options,
        });
    };
};

