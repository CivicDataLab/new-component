import { Meta } from '@storybook/react';
import { COMPONENT_NAME } from './COMPONENT_NAME';

export default {
  component: COMPONENT_NAME,

  argTypes: {
    children: {
      control: 'text',
      description: 'description text',
    },
  },
} as Meta<typeof COMPONENT_NAME>;

export const Primary = {
  args: {
    label: 'COMPONENT_NAME',
  },
};