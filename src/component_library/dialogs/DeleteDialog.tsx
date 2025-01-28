import Dialog, {DialogProps} from "./Dialog.tsx";
import Paragraph from "../texts/Paragraph.tsx";
import * as dlg from '@ark-ui/react/dialog'
import Button from "../forms/Button.tsx";
import FormikButton from "../formik/FormikButton.tsx";
import FormikForm from "../formik/FormikForm.tsx";


export interface DeleteDialogProps extends DialogProps{
    callback: () => unknown
}

function DeleteDialog({ callback, dialog, ...props}: DeleteDialogProps) {
    return (
        <Dialog {...props} title="Eliminar recurso" dialog={dialog}>
            <FormikForm initialValues={{}} onSubmit={async () => {
                await callback()
            }}>
                <Paragraph colorSchema="secondary">¿Estas seguro que quieres realizár esta acción? Una vez completada no habrá forma de deshacerla</Paragraph>
                <div className="flex gap-3 mt-9">
                    <dlg.DialogCloseTrigger asChild>
                        <Button size="md" colorSchema="secondary">Cancelar</Button>
                    </dlg.DialogCloseTrigger>
                    <FormikButton size="md" danger>Confirmar</FormikButton>
                </div>
            </FormikForm>
        </Dialog>
    );
}

export default DeleteDialog;