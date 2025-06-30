import type { Meta, StoryObj } from '@storybook/react';

import Button from './Button';

const meta = {
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const BrandPrimary: Story = {
  args: {
    children: "Pulsar",
    colorSchema: "brand_primary"
  }
};

export const BrandSecondary: Story = {
  args: {
    children: "Pulsar",
    colorSchema: "brand_secondary"
  }
};

export const Primary: Story = {
  args: {
    children: "Pulsar",
    colorSchema: "primary"
  }
};

export const Secondary: Story = {
  args: {
    children: "Pulsar",
    colorSchema: "secondary"
  }
};

export const Sm: Story = {
  args: {
    children: "Pulsar",
    colorSchema: "brand_primary",
    size: "sm"
  }
};

export const Md: Story = {
  args: {
    children: "Pulsar",
    colorSchema: "brand_primary",
    size: "md"
  }
};

export const Lg: Story = {
  args: {
    children: "Pulsar",
    colorSchema: "brand_primary",
    size: "lg"
  }
};