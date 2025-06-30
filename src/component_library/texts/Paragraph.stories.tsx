import type { Meta, StoryObj } from '@storybook/react';

import Paragraph from './Paragraph';

const meta = {
  component: Paragraph,
} satisfies Meta<typeof Paragraph>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "hello world",
    size: "md",
    colorSchema: "primary",
  }
};