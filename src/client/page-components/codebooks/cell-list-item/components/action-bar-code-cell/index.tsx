import { Divider } from '@mui/material';
import { FC } from 'react';
import { ActionBar, CodeCell } from './../../../../../../client/components';
import {
  Direction,
  IDeleteCellAction,
  IMoveCellAction,
  IUpdateCellAction
} from './../../../../../../client/state/reducers/article/cell.actions';

export interface ActionBarCodeCellProps {
  id: string;
  moveCell: (id: string, direction: Direction) => IMoveCellAction;
  deleteCell: (id: string) => IDeleteCellAction;
  content: string;
  updateCell: (id: string, content: string) => IUpdateCellAction;
}

const ActionBarCodeCell: FC<ActionBarCodeCellProps> = ({
  id,
  moveCell,
  deleteCell,
  content,
  updateCell
}) => {
  return (
    <>
      <ActionBar {...{ id, moveCell, deleteCell }} />
      <CodeCell
        className={'CodeCell'}
        onChange={(value) => updateCell(id, value || '')}
        initialValue={content}
      />
      <Divider />
    </>
  );
};

export default ActionBarCodeCell;
