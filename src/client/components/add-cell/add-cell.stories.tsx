import { ComponentMeta, ComponentStory } from '@storybook/react';
import AddCell from '.';

export default {
  title: 'Example/AddCell',
  component: AddCell,
  argTypes: {
    previousCellId: String,
    forceVisible: Boolean,
    insertCellAfter: () => {}
  }
} as ComponentMeta<typeof AddCell>;

const Template: ComponentStory<typeof AddCell> = (args) => {
  return <AddCell {...args} />;
};

export const Visible = Template.bind({});
Visible.args = {
  previousCellId: `abc`,
  forceVisible: true,
  insertCellAfter: () => {}
};

export const Invisible = Template.bind({});
Invisible.args = {
  previousCellId: `abc`,
  forceVisible: false,
  insertCellAfter: () => {}
};
