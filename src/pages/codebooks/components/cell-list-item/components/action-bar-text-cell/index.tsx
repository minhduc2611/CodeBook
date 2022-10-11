import { Divider } from '@mui/material';
import { FC } from 'react';
import { ActionBar, TextEditor } from './../../../../../../client/components';
import {
  Direction,
  IDeleteCellAction,
  IMoveCellAction,
  IUpdateCellAction
} from './../../../../../../client/state/reducers/article/cell.actions';

export interface ActionBarTextCellProps {
  id: string;
  moveCell: (id: string, direction: Direction) => IMoveCellAction;
  deleteCell: (id: string) => IDeleteCellAction;
  content: string;
  updateCell: (id: string, content: string) => IUpdateCellAction;
}

const ActionBarTextCell: FC<ActionBarTextCellProps> = ({
  id,
  moveCell,
  deleteCell,
  content,
  updateCell
}) => {
  return (
    <>
      <ActionBar {...{ id, moveCell, deleteCell }} />
      <TextEditor
        onChange={(value) => updateCell(id, value || '')}
        value={content}
      />
      <Divider />
    </>
  );
};

export default ActionBarTextCell;
