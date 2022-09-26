import { ComponentMeta, ComponentStory } from '@storybook/react';
import CodeCell from '../components/code-editor/code-cell';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/CodeCell',
  component: CodeCell,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof CodeCell>;

const Template: ComponentStory<typeof CodeCell> = (args) => (
  <CodeCell {...args} />
);

const sampleCode = `
import ReactDOM from 'react-dom';
import React from 'react';

const a = 1;
const App = () => {
  return <div>Hello world -- {a}</div> 
}


ReactDOM.render(<App />, document.querySelector('#root'));
                `;

export const Primary = Template.bind({});
Primary.args = {
  cell: {
    id: 'string',
    type: 'code',
    content: sampleCode,
  },
};

// export const Secondary = Template.bind({});
// Secondary.args = {
//   label: 'Button',
// };

// export const Large = Template.bind({});
// Large.args = {
//   size: 'large',
//   label: 'Button',
// };

// export const Small = Template.bind({});
// Small.args = {
//   size: 'small',
//   label: 'Button',
// };
