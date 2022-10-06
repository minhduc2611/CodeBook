import { ComponentMeta, ComponentStory } from '@storybook/react';

import Dashboard from '.';

export default {
  title: 'Example/Dashboard',
  component: Dashboard,
  argTypes: {}
} as ComponentMeta<typeof Dashboard>;

const Template: ComponentStory<typeof Dashboard> = (args) => {
  return (
    <div style={{ height: 500, width: '100%' }}>
      <Dashboard {...args} />
    </div>
  );
};

export const Primary = Template.bind({});
Primary.args = {
  jsxEnabled: true,
  monacoEnabled: true,
  isJSXHighlightingOn: true,
  toggleJSXHighlighting: true,
  isJSXCommentingOn: true,
  toggleJSXCommenting: true,
  theme: {},
  toggleTheme: () => {},
  language: 'javascript',
  toggleLanguage: () => {},
  onFormatClick: () => {},
  OnRunCode: () => {}
};
