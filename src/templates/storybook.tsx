import { ComponentMeta, ComponentStory } from '@storybook/react';

import { COMPONENT_NAME } from './COMPONENT_NAME';

export default {
  title: 'Components/COMPONENT_NAME',
  component: COMPONENT_NAME,

  argTypes: {
    children: {
      control: 'text',
      description: 'description text',
    },
  },
} as ComponentMeta<typeof COMPONENT_NAME>;

const Template: ComponentStory<typeof COMPONENT_NAME> = (props) => <COMPONENT_NAME {...props} />;
export const Primary = Template.bind({});
Primary.args = {
  children: 'COMPONENT_NAME',
};
