import { ArrowDownward, ArrowUpward, Delete } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { Direction } from '../../state/reducers/article/cell.actions';
import styles from './action-bar.module.scss';

export interface ActionBarProps {
  id: string;
  moveCell: (id: string, direction: Direction) => any;
  deleteCell: (id: string) => any;
}

const ActionBar: React.FC<ActionBarProps> = ({ id, moveCell, deleteCell }) => {
  return (
    <div className={[styles.actionBarWrapper, 'ActionBar'].join(' ')}>
      <IconButton
        className={styles.actionBarButton}
        color="inherit"
        onClick={() => deleteCell(id)}
        title="Delete cell"
      >
        <Delete />
      </IconButton>
      <IconButton
        className={styles.actionBarButton}
        color="inherit"
        onClick={() => moveCell(id, 'down')}
        title="Move cell down"
      >
        <ArrowDownward />
      </IconButton>
      <IconButton
        className={styles.actionBarButton}
        color="inherit"
        onClick={() => moveCell(id, 'up')}
        title="Move cell up"
      >
        <ArrowUpward />
      </IconButton>
    </div>
  );
};
export default ActionBar;
