import { ComponentMeta, ComponentStory } from '@storybook/react';

import Resizable from '.';

export default {
  title: 'Example/Resizable',
  component: Resizable,
  argTypes: {
    direction: String,
    onResizeStart: (text: String) => {},
    onResizeStop: (text: String) => {}
  }
} as ComponentMeta<typeof Resizable>;

const Template: ComponentStory<typeof Resizable> = (args) => {
  return (
    <Resizable {...args}>
      <div
        style={{
          position: 'relative',
          height: '100%',
          width: 'calc(100% - 10px)',
          display: 'inline-block',
          background: 'yellow'
        }}
      >?</div>
    </Resizable>
  );
};

export const Primary = Template.bind({});
Primary.args = {
  direction: 'verticle'
};
