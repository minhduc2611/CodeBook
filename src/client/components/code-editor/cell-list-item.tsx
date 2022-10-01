import { Divider } from '@mui/material';
import { useCellContext } from 'src/client/state/hooks/useCellContext';
import { Cell } from './../../../client/state/types/cell';
import ActionBar from './action-bar';
import style from './cell-list-item.module.scss';
import CodeCell from './code-cell';
import TextEditor from './text-editor';
interface CellListItemProps {
  cell: Cell;
}

const CellListItem: React.FC<CellListItemProps> = ({ cell }) => {
  let child: JSX.Element;
  const {
    actions: { updateCell }
  } = useCellContext();

  if (cell.type === 'code') {
    child = (
      <>
        <div className={style.actionBarWrapper}>
          <ActionBar id={cell.id} />
        </div>
        <CodeCell cell={cell} />
        <Divider />
      </>
    );
  } else {
    child = (
      <>
        <TextEditor
          onChange={(value) => updateCell(cell.id, value || '')}
          value={cell.content}
        />
        <Divider />
        <ActionBar id={cell.id} />
      </>
    );
  }

  return <div className={style.cellListItem}>{child}</div>;
};

export default CellListItem;
