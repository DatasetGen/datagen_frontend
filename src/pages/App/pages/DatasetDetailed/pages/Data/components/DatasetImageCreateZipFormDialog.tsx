import { useCreateZipDatasetImages} from "../../../../../../../api/app/datasets.ts";
import {queryClient} from "../../../../../../../api/client.ts";
import FormikForm from "../../../../../../../component_library/formik/FormikForm.tsx";
import FormikButton from "../../../../../../../component_library/formik/FormikButton.tsx";
import {UseDialogReturn} from "@ark-ui/react/dialog";
import * as dg from "@ark-ui/react/dialog";
import Button from "../../../../../../../component_library/forms/Button.tsx";
import Dialog from "../../../../../../../component_library/dialogs/Dialog.tsx";
import {useParams} from "react-router";
import FormikFileInput from "../../../../../../../component_library/formik/FormikFileInput.tsx";



interface Props{
    dialog : UseDialogReturn
}

function DatasetCreateZipFormDialog({dialog}: Props) {

    const {dataset_id} = useParams();
    const {mutateAsync} = useCreateZipDatasetImages(parseInt(dataset_id || ""))({
        onSuccess: () => (
            queryClient.invalidateQueries({
                queryKey: ['datasets']
            })
        )
    })

    return (
        <Dialog size="lg" dialog={dialog} title="Create new Dataset">
            <FormikForm className="grid gap-2" initialValues={{zip_file: ""}} onSubmit={async (values, helpers) => {
                await mutateAsync(values)
                dialog.setOpen(false)
                helpers.resetForm()
            }}>
                <FormikFileInput type="file" placeholder="Name of the dataset" name="zip_file" label="Name"></FormikFileInput>
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

export default DatasetCreateZipFormDialog;