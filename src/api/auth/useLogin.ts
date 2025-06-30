import {createMutationHook} from "../engine/factories";
import {toast} from "react-toastify";
import {queryClient} from "../client.ts";

interface LoginRequest{
    username: string;
    password: string;
}

interface LoginResponse{
    token: string
}

export const useLogin = createMutationHook<LoginRequest, LoginResponse>('POST',
    '/auth/token/',
    {
        onSuccess: async (res) => {
            localStorage.setItem("token", res.token)
            toast.success('You are logged in :)');
            await queryClient.refetchQueries({
                queryKey: ["authenticated",]
            })
        }
    }
)