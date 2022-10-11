import { ComponentMeta, ComponentStory } from '@storybook/react';

import Resizable from '.';

export default {
  title: 'Example/Resizable',
  component: Resizable,
  argTypes: {
    direction: String,
    onResizeStart: () => {},
    onResizeStop: () => {}
  }
} as ComponentMeta<typeof Resizable>;

const Template: ComponentStory<typeof Resizable> = (args) => {
  return (
    <>
      <Resizable
        {...args}
        onResizeStop={(a) => {
          console.log('asdasddas', a);
        }}
      >
        <div
          style={{
            position: 'relative',
            height: '100%',
            width: '100%',
            display: 'inline-block',
            background: 'yellow'
          }}
        >
          ?
        </div>
      </Resizable>
      <Resizable
        {...args}
        onResizeStop={(a) => {
          console.log('asdasddas', a);
        }}
      >
        <div
          style={{
            position: 'relative',
            height: '100%',
            width: '100%',
            display: 'inline-block',
            background: 'yellow'
          }}
        >
          ?
        </div>
      </Resizable>
    </>
  );
};

export const Vertical = Template.bind({});
Vertical.args = {
  direction: 'vertical'
};

const TemplateHorizontal: ComponentStory<typeof Resizable> = (args) => {
  return (
    <Resizable {...args}>
      <div
        style={{
          position: 'relative',
          height: '100px',
          width: 'calc(100% - 10px)',
          display: 'inline-block',
          background: 'yellow'
        }}
      >
        ?
      </div>
    </Resizable>
  );
};
export const Horizontal = TemplateHorizontal.bind({});
Horizontal.args = {
  direction: 'horizontal'
};
