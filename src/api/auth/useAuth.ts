import {createQueryHook} from "../engine/factories";

interface Auth{
    authenticated: boolean;
}

export const useAuth = createQueryHook<Auth>(["authenticated"], "/auth/is_authenticated/")