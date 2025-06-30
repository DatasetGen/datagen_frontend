import { apiClient } from "../../client.ts";
import { AxiosError, AxiosInstance } from 'axios';
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

interface ApiError {
    status: number;
    message: string;
    details?: unknown;
}

type HttpMethod = "POST" | "DELETE" | "PATCH";

// Generic mutate function with typed errors and support for different HTTP methods
const mutateData = async <TBody, TResponse>(
    method: HttpMethod,
    endpoint: string,
    body?: TBody,
    customApiClient?: AxiosInstance
): Promise<TResponse> => {
    try {
        if(customApiClient) {
            const response = await customApiClient({
                method,
                url: endpoint,
                data: body,
            });
            return response.data;
        }else{
            const response = await apiClient({
                method,
                url: endpoint,
                data: body,
            });
            return response.data;
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            throw error as AxiosError<ApiError>;
        }
        throw error; // Re-throw non-Axios errors
    }
};

// Utility function for creating mutation hooks with HTTP methods
export const createMutationHook = <TBody, TResponse>(
    method: HttpMethod,
    endpoint: string,
    baseOptions?: UseMutationOptions<TResponse, AxiosError<ApiError>, TBody> & {apiClient?: AxiosInstance}
) => {
    return (
        options?: UseMutationOptions<TResponse, AxiosError<ApiError>, TBody>
    ) => {
        return useMutation<TResponse, AxiosError<ApiError>, TBody>({
            mutationFn: (body: TBody) => mutateData<TBody, TResponse>(method, endpoint, body, baseOptions?.apiClient),
            ...baseOptions,
            ...options
        });
    };
};
