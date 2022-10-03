import { Divider } from '@mui/material';
import ActionBar from '../../../../client/components/action-bar';

import CodeCell from '../../../../client/components/code-cell';
import TextEditor from '../../../../client/components/text-editor';
import { useCellContext } from './../../../../client/state/hooks/useCellContext';
import { Cell } from './../../../../client/state/types/cell';
import style from './cell-list-item.module.scss';
interface CellListItemProps {
  cell: Cell;
}

const CellListItem: React.FC<CellListItemProps> = ({ cell : {id, content, type} }) => {
  let child: JSX.Element;
  const {
    actions: { updateCell, moveCell, deleteCell }
  } = useCellContext();

  if (type === 'code') {
    child = (
      <>
        <div className={style.actionBarWrapper}>
          <ActionBar {...{ id, moveCell, deleteCell }} />
        </div>
        <CodeCell
          onChange={(value) => updateCell(id, value || '')}
          initialValue={content}
        />
        <Divider />
      </>
    );
  } else {
    child = (
      <>
        <TextEditor
          onChange={(value) => updateCell(id, value || '')}
          value={content}
        />
        <Divider />
        <ActionBar {...{ id, moveCell, deleteCell }}/>
      </>
    );
  }

  return <div className={style.cellListItem}>{child}</div>;
};

export default CellListItem;
