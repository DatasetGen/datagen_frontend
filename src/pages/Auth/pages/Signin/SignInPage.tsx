import {Formik} from "formik";
import {useLogin} from "../../../../api/auth/useLogin.ts";
import FormikButton from "../../../../component_library/formik/FormikButton.tsx";
import {FormikInput, FormikPasswordInput} from "../../../../component_library/formik/FormikInputs.tsx";
import {toast} from "react-toastify";
import {queryClient} from "../../../../api/client.ts";
import {useNavigate} from "react-router";

function SignInPage() {
    const navitate = useNavigate()
    const {mutate} = useLogin({
        onSuccess: async (res) => {
            localStorage.setItem("token", res.token)
            toast.success('Wow so easy !');
            await queryClient.refetchQueries({
                queryKey: ["authenticated",]
            })
            navitate("/app/")
        },
        onError: () => {
            toast.error('Error');
        }
    });

    return (
        <Formik initialValues={{username: "", password: ""}} onSubmit={(values, helpers) => {
            mutate(values)
            helpers.setSubmitting(false)
        }}>
            {
                () => (
                    <>
                        <FormikInput colorSchema="secondary" name="username" placeholder={"your email"}></FormikInput>
                        <FormikPasswordInput name="password"></FormikPasswordInput>
                        <FormikButton>Login</FormikButton>
                    </>
                )
            }
        </Formik>
    );
}

export default SignInPage;