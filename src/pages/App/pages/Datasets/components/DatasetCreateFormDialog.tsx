import React from 'react';
import {UseDialogReturn} from "@ark-ui/react/dialog";
import Dialog from "../../../../../component_library/dialogs/Dialog.tsx";
import FormikForm from "../../../../../component_library/formik/FormikForm.tsx";
import {FormikInput, FormikTextArea} from "../../../../../component_library/formik/FormikInputs.tsx";
import FormikButton from "../../../../../component_library/formik/FormikButton.tsx";
import Button from "../../../../../component_library/forms/Button.tsx";
import * as dg from '@ark-ui/react/dialog'
import {useCreateDataset} from "../../../../../api/app/datasets.ts";
import {queryClient} from "../../../../../api/client.ts";

interface Props{
    dialog : UseDialogReturn
}

function DatasetCreateFormDialog({dialog}: Props) {

    const {mutateAsync} = useCreateDataset({
        onSuccess: () => (
            queryClient.invalidateQueries({
                queryKey: ['datasets']
            })
        )
    })

    return (
        <Dialog size="lg" dialog={dialog} title="Create new Dataset">
            <FormikForm className="grid gap-2" initialValues={{name: "", description: ""}} onSubmit={async (values, helpers) => {
                await mutateAsync(values)
                dialog.setOpen(false)
                helpers.resetForm()
            }}>
                <FormikInput placeholder="Name of the dataset" name="name" label="Name"></FormikInput>
                <FormikTextArea placeholder="Description of the dataset" name="description" label="Description"></FormikTextArea>
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