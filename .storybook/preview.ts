import type { Preview } from "@storybook/react";
import "../src/index.css"

const preview: Preview = {
  parameters: {
    backgrounds: {
      values: [
        { name: 'Primary', value: 'white' },
        { name: 'Secondary', value: 'rgb(233, 234, 236)' },
        { name: 'BrandPrimary', value: 'rgb(0, 0, 0)' },
      ],
      default: 'Light',
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
