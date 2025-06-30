// @ts-ignore

import type { Meta, StoryObj } from '@storybook/react';
import Dialog, {DialogProps} from './Dialog.tsx';
import {useDialog} from "@ark-ui/react";

const meta = {
  component: Dialog,
} satisfies Meta<typeof Dialog>;

export default meta;

type Story = StoryObj<typeof meta>;

const DialogWrapper = (args: DialogProps) => {
  const dialog = useDialog();

  return (
      <>
          <button onClick={() => dialog.setOpen(true)}>open</button>
          <Dialog
              {...args}
              dialog={dialog}
          >
            {args.children}
          </Dialog>
      </>
  );
};

export const Default: Story = {
  render: (args: DialogProps) => <DialogWrapper {...args} />,
  args: {
    children: "Hola",
    title: "Título"
  },
};
