import { Button } from '@mui/material';
import { Direction } from '../../state/reducers/article/cell.actions';
import styles from './action-bar.module.scss';

export interface ActionBarProps {
  id: string;
  moveCell: (id: string, direction: Direction) => any;
  deleteCell: (id: string) => any;
}

const ActionBar: React.FC<ActionBarProps> = ({ id, moveCell, deleteCell }) => {
  return (
    <div className={styles.actionBar}>
      <Button onClick={() => moveCell(id, 'up')} variant="outlined">
        Up
      </Button>
      <Button onClick={() => moveCell(id, 'down')} variant="outlined">
        Down
      </Button>
      <Button onClick={() => deleteCell(id)} variant="outlined">
        Delete
      </Button>
    </div>
  );
};
export default ActionBar;
