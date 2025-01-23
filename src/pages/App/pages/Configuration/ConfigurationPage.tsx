import Button from "../../../../component_library/forms/Button.tsx";
import PageLayout from "../../../../component_library/layouts/PageLayout.tsx";
import { useLogout } from "../../../../api/auth/useLogout.ts";

function ConfigurationPage() {

    const {logOut} = useLogout()

    return (
        <PageLayout size="xl" title="Your datasets">
            <Button onClick={logOut} colorSchema="primary">Logout</Button>
        </PageLayout>
    );
}

export default ConfigurationPage;