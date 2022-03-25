import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { BwButton } from './BwButton';
export default {
  title: 'Common/Button',
  component: Button,
  parameters: {
    docs: {
      description: {
        component: 'Button 컴포넌트',
      },
    },
  },
  argTypes: {
    text: {
      description: '텍스트',
      control: { type: 'text' },
    },
    onClick: {
      description: '클릭액션',
      control: { type: 'action' },
    },
  },
} as ComponentMeta<typeof Button>;
const Template: ComponentStory<typeof Button> = args => <Button {...args} />;
export const DefaultButton = Template.bind({});
DefaultButton.args = {
  text: '입장하기',
};
