import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';

import CodeCell from '.';

export default {
  title: 'Example/CodeCell',
  component: CodeCell,
  argTypes: {
    initialValue: String,
    onChange: (text: String) => {}
  }
} as ComponentMeta<typeof CodeCell>;

const Template: ComponentStory<typeof CodeCell> = (args) => {
  const [value, setValue] = useState(args.initialValue);
  return (
    <div style={{ height: 500, width: '100%' }}>
      <CodeCell initialValue={value} onChange={setValue} {...args} />
    </div>
  );
};

export const Primary = Template.bind({});
Primary.args = {
  initialValue: `
import React from 'react';
import ReactDOM from 'react-dom';

var element = React.createElement('h1', { className: 'greeting' }, 'Hello, world!');
ReactDOM.render(element, document.getElementById('root'));
  
  `
};
