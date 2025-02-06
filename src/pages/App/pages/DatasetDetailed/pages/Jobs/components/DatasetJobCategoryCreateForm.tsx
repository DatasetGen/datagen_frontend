import {useCreateDatasetImages, useCreateDatasetJobsCategories} from "../../../../../../../api/app/datasets.ts";
import {queryClient} from "../../../../../../../api/client.ts";
import FormikForm from "../../../../../../../component_library/formik/FormikForm.tsx";
import FormikButton from "../../../../../../../component_library/formik/FormikButton.tsx";
import {UseDialogReturn} from "@ark-ui/react/dialog";
import * as dg from "@ark-ui/react/dialog";
import Button from "../../../../../../../component_library/forms/Button.tsx";
import Dialog from "../../../../../../../component_library/dialogs/Dialog.tsx";
import {useParams} from "react-router";
import FormikFileInput from "../../../../../../../component_library/formik/FormikFileInput.tsx";
import {FormikInput} from "../../../../../../../component_library/formik/FormikInputs.tsx";



interface Props{
    dialog : UseDialogReturn
}

function DatasetCreateFormDialog({dialog}: Props) {

    const {dataset_id} = useParams();
    const {mutateAsync} = useCreateDatasetJobsCategories(parseInt(dataset_id || ""))({
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['datasets']
            });
            dialog.setOpen(false);
        }
    })

    return (
        <Dialog size="lg" dialog={dialog} title="Create new Category">
            <FormikForm className="grid gap-2" initialValues={{name: ""}} onSubmit={async (values, helpers) => {
                await mutateAsync(values)
                dialog.setOpen(false)
                helpers.resetForm()
            }}>
                <FormikInput placeholder="Name of the category" name="name" label="Name"></FormikInput>
                <div className="w-full justify-center flex  gap-3 max-w-[300px] mt-4 mx-auto">
                    <dg.DialogCloseTrigger asChild>
                        <Button size="md" colorSchema="primary">Cancel</Button>
                    </dg.DialogCloseTrigger>
                    <FormikButton size="md">Create</FormikButton>
                </div>
            </FormikForm>
        </Dialog>
    );
}

export default DatasetCreateFormDialog;