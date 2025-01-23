import {createQueryHook} from "../engine.ts";

interface Auth{
    authenticated: boolean;
}

export const useAuth = createQueryHook<Auth>("authenticated", "/auth/is_authenticated/")