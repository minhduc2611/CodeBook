import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';

import CodeEditor from '.';

export default {
  title: 'Example/CodeEditor',
  component: CodeEditor,
  argTypes: {}
} as ComponentMeta<typeof CodeEditor>;

const Template: ComponentStory<typeof CodeEditor> = (args) => {
  const [value, setValue] = useState('');
  return (
    <div style={{ height: 500, width: '100%' }}>
      <CodeEditor initialValue={value} onChange={setValue} {...args} />
    </div>
  );
};

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  label: 'CodeEditor'
};
