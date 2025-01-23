import {createMutationHook} from "../engine.ts";

interface LoginRequest{
    username: string;
    password: string;
}

interface LoginResponse{
    token: string
}

export const useLogin = createMutationHook<LoginRequest, LoginResponse>(
    '/auth/token/'
)