import {useLogin} from "../../../../api/auth/useLogin.ts";
import FormikButton from "../../../../component_library/formik/FormikButton.tsx";
import {FormikInput, FormikPasswordInput} from "../../../../component_library/formik/FormikInputs.tsx";
import {toast} from "react-toastify";
import FormikForm from "../../../../component_library/formik/FormikForm.tsx";
import {HiMail, HiLockClosed} from "react-icons/hi";
import Logo from '../../../../assets/datasetPositivePrimaryLogo.png'
import Title from "../../../../component_library/texts/Title.tsx";
import Paragraph from "../../../../component_library/texts/Paragraph.tsx";
import loginCreativity from '../../../../assets/loginCreativity.png'

function SignInPage() {
    const {mutateAsync, error} = useLogin({
        onError: () => {
            toast.error('Incorrect credentials');
        }
    });

    return (
        <section className="grid md:grid-cols-2">
            <img width={150} src={Logo} className="absolute left-0 top-0 m-5"/>
            <div className="w-full p-3 max-w-[600px] mx-auto my-auto min-h-[100vh] flex md:items-center">
                <FormikForm className="grid gap-4 w-full" initialValues={{username: "", password: ""}}
                            onSubmit={async (values) => {
                                await mutateAsync(values)
                            }} fetchErrors={error?.message}>
                    <div className="mb-5 grid gap-3">
                        <Title size="lg">Get Started</Title>
                        <Paragraph colorSchema="secondary">Welcome to Datagen - Let's get started</Paragraph>
                    </div>
                    <FormikInput size="lg" leftIcon={() => <HiMail size={18}/>} name="username"
                                 placeholder={"your email"}></FormikInput>
                    <FormikPasswordInput size="lg" leftIcon={() => <HiLockClosed size={18}/>} name="password"
                                         placeholder="Password"></FormikPasswordInput>
                    <FormikButton size="md">Login</FormikButton>
                </FormikForm>
            </div>
            <div className="bg-brand_primary-200 h-[100vh] relative overflow-hidden flex justify-center items-center">
              <div className="w-full p-20">
                <Title size="lg" colorSchema="brand_secondary">Join the Generative AI labeling revolution</Title>
                <Paragraph size="xl">Welcome to DataGen</Paragraph>
                <img className="mt-10 max-w-[900px] w-full " src={loginCreativity} />
              </div>
            </div>
        </section>
    );
}

export default SignInPage;