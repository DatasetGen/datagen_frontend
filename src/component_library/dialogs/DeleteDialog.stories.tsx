// @ts-ignore

import type { Meta, StoryObj } from '@storybook/react';
import DeleteDialog, {DeleteDialogProps} from './DeleteDialog.tsx';
import {useDialog} from "@ark-ui/react";
import FormikForm from "../formik/FormikForm.tsx";

const meta = {
    component: DeleteDialog,
} satisfies Meta<typeof DeleteDialog>;

export default meta;

type Story = StoryObj<typeof meta>;

const DeleteDialogWrapper = (args: DeleteDialogProps) => {
    const deleteDialog = useDialog();

    return (
        <FormikForm initialValues={{}} onSubmit={() => {}}>
            <button onClick={() => deleteDialog.setOpen(true)}>open</button>
            <DeleteDialog
                {...args}
                dialog={deleteDialog}
            >
                {args.children}
            </DeleteDialog>
        </FormikForm>
    );
};

export const Default: Story = {
    render: (args: DeleteDialogProps) => <DeleteDialogWrapper {...args} />,
    args: {
        children: "Hola",
        title: "Título"
    },
};
