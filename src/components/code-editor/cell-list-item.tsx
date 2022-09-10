import { Divider } from '@mui/material';
import { Cell } from '../../state/types/cell';
import ActionBar from './action-bar';
import style from './cell-list-item.module.scss';
import CodeCell from './code-cell';
import TextEditor from './text-editor';
interface CellListItemProps {
  cell: Cell;
}

const CellListItem: React.FC<CellListItemProps> = ({ cell }) => {
  let child: JSX.Element;
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
        <TextEditor cell={cell} />
        <Divider />
        <ActionBar id={cell.id} />
      </>
    );
  }

  return <div className={style.cellListItem}>{child}</div>;
};

export default CellListItem;
