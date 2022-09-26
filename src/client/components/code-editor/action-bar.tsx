import { Button } from '@mui/material';
import { useCellContext } from './../../state/hooks/useCellContext';
import styles from './action-bar.module.scss';

interface ActionBarProps {
  id: string;
}

const ActionBar: React.FC<ActionBarProps> = ({ id }) => {
  const {
    actions: { moveCell, deleteCell },
  } = useCellContext();

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
