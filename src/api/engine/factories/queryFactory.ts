import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { apiClient } from '../../client.ts';
import { AxiosError } from 'axios';

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

// Utility function for creating factories with typed errors
export const createQueryHook = <TResponse>(
    queryKey: unknown[],
    endpoint: string,
    baseOptions?: Partial<UseQueryOptions<TResponse, AxiosError<ApiError>>>
) => {
    return (
        filters: Record<string, unknown> = {},
        options?: Partial<UseQueryOptions<TResponse, AxiosError<ApiError>>>
    ) => {
        return useQuery<TResponse, AxiosError<ApiError>>({
            queryKey: [...queryKey, filters],
            queryFn: () => fetchData<TResponse>(endpoint, filters),
            ...baseOptions,
            ...options
        });
    };
};