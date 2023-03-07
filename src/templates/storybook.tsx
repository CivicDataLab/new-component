import { Meta, StoryObj } from '@storybook/react';
import { COMPONENT_NAME } from './COMPONENT_NAME';

/**
 * COMPONENT_NAME Description
 *
 * Reference: #
 */
const meta = {
  component: COMPONENT_NAME,
} satisfies Meta<typeof COMPONENT_NAME>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'COMPONENT_NAME',
  },
};