import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';

import TextEditor from '.';

export default {
  title: 'Example/TextEditor',
  component: TextEditor,
  argTypes: {
  },
} as ComponentMeta<typeof TextEditor>;

const Template: ComponentStory<typeof TextEditor> = (args) => {
  const [value, setValue] = useState('')
  return <TextEditor value={value} onChange={setValue} {...args} />
};

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  label: 'TextEditor',
};