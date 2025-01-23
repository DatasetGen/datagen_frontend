import type { Meta, StoryObj } from '@storybook/react';

import Tabs from './Tabs';
import {BrowserRouter} from "react-router";

const meta = {
  component: Tabs,
  decorators: (Story) => (
      <BrowserRouter>
        <Story></Story>
      </BrowserRouter>
  )
} satisfies Meta<typeof Tabs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    elements: [
      {
       name : "Pepe",
       url : "/pepe",
       pathname: "/pepe"
      },
      {
        name : "Alfonso",
        url : "/alfonso",
        pathname: "/alfonso"
      }
    ]
  }
};