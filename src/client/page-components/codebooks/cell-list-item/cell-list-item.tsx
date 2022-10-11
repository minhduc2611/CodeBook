import { useCellContext } from './../../../../client/state/hooks/useCellContext';
import { Cell } from './../../../../client/state/types/cell';
import style from './cell-list-item.module.scss';
import ActionBarCodeCell from './components/action-bar-code-cell';
import ActionBarTextCell from './components/action-bar-text-cell';
export interface CellListItemProps {
  cell: Cell;
}

const CellListItem: React.FC<CellListItemProps> = ({
  cell: { id, content, type }
}) => {
  let child: JSX.Element;
  const {
    actions: { updateCell, moveCell, deleteCell }
  } = useCellContext();

  const props = { id, moveCell, deleteCell, content, updateCell };

  if (type === 'code') {
    child = <ActionBarCodeCell {...props} />;
  } else {
    child = <ActionBarTextCell {...props} />;
  }

  return <div className={style.cellListItem}>{child}</div>;
};

export default CellListItem;
