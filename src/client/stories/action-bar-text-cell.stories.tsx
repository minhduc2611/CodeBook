import { ComponentMeta, ComponentStory } from '@storybook/react';
import ActionBarTextCell from '../page-components/codebooks/cell-list-item/components/action-bar-text-cell';

export default {
  title: 'Example/ActionBarTextCell',
  component: ActionBarTextCell,
  argTypes: {
    id: String,
    moveCell: () => {},
    deleteCell: () => {},
    content: String,
    updateCell: () => {}
  }
} as ComponentMeta<typeof ActionBarTextCell>;

const Template: ComponentStory<typeof ActionBarTextCell> = (args) => {
  return <ActionBarTextCell {...args} />;
};

export const Primary = Template.bind({});
Primary.args = {
  label: 'ActionBarTextCell',
  id: '123',
  moveCell: () => {},
  deleteCell: () => {},
  content: `
  ### 1 Hello text editor
    `,
  updateCell: () => {}
};
