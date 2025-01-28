import {UseDialogReturn} from "@ark-ui/react/dialog";
import FormikForm from "../../../../../../../component_library/formik/FormikForm.tsx";
import {FormikInput, FormikTextArea} from "../../../../../../../component_library/formik/FormikInputs.tsx";
import * as dg from '@ark-ui/react/dialog'
import {useCreateDataset, useCreateDatasetLabel} from "../../../../../../../api/app/datasets.ts";
import Button from "../../../../../../../component_library/forms/Button.tsx";
import FormikButton from "../../../../../../../component_library/formik/FormikButton.tsx";
import {queryClient} from "../../../../../../../api/client.ts";
import Dialog from "../../../../../../../component_library/dialogs/Dialog.tsx";
import {useParams} from "react-router";
import FormikColorPicker from "../../../../../../../component_library/formik/FormikColorPicker.tsx";

interface Props{
    dialog : UseDialogReturn
}

function DatasetCreateFormDialog({dialog}: Props) {

    const {dataset_id} = useParams()
    const {mutateAsync} = useCreateDatasetLabel(parseInt(dataset_id ?? ""))({
        onSuccess: async () => {
            queryClient.invalidateQueries({
                queryKey: ['datasets', parseInt(dataset_id ?? ""), "labels"]
            })
        }
    })

    return (
        <Dialog size="lg" dialog={dialog} title="Create new Label">
            <FormikForm className="grid gap-2" initialValues={{name: "", color: "#fff0000"}} onSubmit={async (values, helpers) => {
                await mutateAsync(values)
                dialog.setOpen(false)
                helpers.resetForm()
            }}>
                <FormikInput placeholder="Name of the label" name="name" label="Name"></FormikInput>
                <FormikColorPicker colorSchema="brand_secondary" label="Color" name="color" type="color"></FormikColorPicker>
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