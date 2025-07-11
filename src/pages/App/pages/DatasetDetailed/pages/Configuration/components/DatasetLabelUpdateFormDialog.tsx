import {UseDialogReturn} from "@ark-ui/react/dialog";
import FormikForm from "../../../../../../../component_library/formik/FormikForm.tsx";
import {FormikInput, FormikTextArea} from "../../../../../../../component_library/formik/FormikInputs.tsx";
import * as dg from '@ark-ui/react/dialog'
import {
    useCreateDatasetLabel,
    useDatasetLabel,
    useModifyDatasetLabel,
} from '../../../../../../../api/app/datasets.ts';
import Button from "../../../../../../../component_library/forms/Button.tsx";
import FormikButton from "../../../../../../../component_library/formik/FormikButton.tsx";
import {queryClient} from "../../../../../../../api/client.ts";
import Dialog from "../../../../../../../component_library/dialogs/Dialog.tsx";
import {useParams} from "react-router";
import FormikColorPicker from "../../../../../../../component_library/formik/FormikColorPicker.tsx";
import Title from "../../../../../../../component_library/texts/Title.tsx";
import {useState} from "react";
import {BiChevronDown, BiChevronRight} from "react-icons/bi";
import { DatasetLabel } from '../../../../../../../types';

interface Props{
    dialog : UseDialogReturn,
    label: DatasetLabel
}

function DatasetCreateFormDialog({dialog, label}: Props) {
    const [open, setOpen] = useState(false)
    const {dataset_id} = useParams()
    const {data, isLoading} = useDatasetLabel(parseInt(dataset_id ?? ""), label.id)()
    const {mutateAsync} = useModifyDatasetLabel(parseInt(dataset_id ?? ""), label.id)({
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['datasets', parseInt(dataset_id ?? ""), "labels"]
            })
        }
    })

    if(isLoading) return <></>

    return (
        <Dialog size="lg" dialog={dialog} title="Create new Label">
            <FormikForm className="grid gap-2" initialValues={{...data, negative_prompt: "", prompt: ""}}
                        onSubmit={async (values, helpers) => {
                            await mutateAsync(values)
                            dialog.setOpen(false)
                            helpers.resetForm()
                        }}>
                <FormikInput placeholder="Name of the label" name="name" label="Name"></FormikInput>
                <FormikInput placeholder="Order of the label" name="order" label="Order" type="number"></FormikInput>
                <FormikColorPicker colorSchema="brand_secondary" label="Color" name="color"
                                   type="color"></FormikColorPicker>
                <div className="mt-2"></div>
                <div className="bg-gray-100 p-3 rounded-lg flex flex-col gap-3">
                    <div className="w-full cursor-pointer justify-between flex items-center" onClick={() => {setOpen((open) => !open)}}>
                        <Title >IA configuration</Title>
                        {
                            open ?
                                <BiChevronDown></BiChevronDown>
                            :
                                <BiChevronRight></BiChevronRight>
                        }
                    </div>
                    {
                        open &&
                        <>
                            <FormikTextArea colorSchema="secondary" placeholder="Prompt..."
                                            label="Description of the label (Prompt)" name="prompt"
                                            type="color"></FormikTextArea>
                            <FormikInput colorSchema="secondary" placeholder="Negative prompt..."
                                         label="Negative description of the label (Negative Prompt)"
                                         name="negative_prompt"></FormikInput>
                        </>
                    }
                </div>
                <div className="w-full justify-center flex  gap-3 max-w-[300px] mt-4 mx-auto">
                    <dg.DialogCloseTrigger asChild>
                        <Button size="md" colorSchema="primary">Cancel</Button>
                    </dg.DialogCloseTrigger>
                    <FormikButton size="md">Update</FormikButton>
                </div>
            </FormikForm>
        </Dialog>
    );
}

export default DatasetCreateFormDialog;