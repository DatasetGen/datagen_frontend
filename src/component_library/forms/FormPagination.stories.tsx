import type { Meta, StoryObj } from '@storybook/react';

import { FormPagination } from './FormPagination';
import {usePagination} from "@ark-ui/react";

const Wrapper = () => {
  const pagination = usePagination({
  count: 200,
  pageSize: 10,
  });
  return <FormPagination paginationProps={pagination}></FormPagination>
}

const meta = {
  component: Wrapper,
} satisfies Meta<typeof FormPagination>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};