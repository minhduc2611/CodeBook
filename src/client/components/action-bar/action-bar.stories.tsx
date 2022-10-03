import { ComponentMeta, ComponentStory } from '@storybook/react';
import ActionBar from '.';


export default {
  title: 'Example/ActionBar',
  component: ActionBar,
  argTypes: {
    id: String,
    moveCell: (text: String) => {},
    deleteCell: (text: String) => {}
  }
} as ComponentMeta<typeof ActionBar>;

const Template: ComponentStory<typeof ActionBar> = (args) => {

  return (
      <ActionBar {...args} />
  );
};

export const Primary = Template.bind({});
Primary.args = {
  id: `abc`
};
