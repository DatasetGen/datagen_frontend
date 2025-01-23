import {useNavigate} from "react-router";
import {queryClient} from "../client.ts";

export const useLogout = () => {
    const navigate = useNavigate()

    async function logOut(){
        localStorage.removeItem('token');
        await queryClient.refetchQueries({
            queryKey: ["authenticated",]
        })
        navigate("/auth/")
    }

    return {
        logOut
    }
};