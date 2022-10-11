import { ComponentMeta, ComponentStory } from '@storybook/react';
// import { useState } from 'react';

import ActionBarCodeCell from '.';

export default {
  title: 'Example/ActionBarCodeCell',
  component: ActionBarCodeCell,
  argTypes: {
    id: String,
    moveCell: () => {},
    deleteCell: () => {},
    content: String,
    updateCell: () => {}
  }
} as ComponentMeta<typeof ActionBarCodeCell>;

const Template: ComponentStory<typeof ActionBarCodeCell> = (args) => {
  return <ActionBarCodeCell {...args} />;
};

export const Primary = Template.bind({});
Primary.args = {
  label: 'ActionBarCodeCell',
  id: '123',
  moveCell: () => {},
  deleteCell: () => {},
  content: `
  import React from 'react';
  import ReactDOM from 'react-dom';
  
  var element = React.createElement('h1', { className: 'greeting' }, 'Hello, world!');
  ReactDOM.render(element, document.getElementById('root'));
    
    `,
  updateCell: () => {}
};
