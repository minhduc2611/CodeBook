import CodeIcon from '@mui/icons-material/Code';
import NotesIcon from '@mui/icons-material/Notes';
import { Button } from '@mui/material';
import { useCellContext } from './../../../client/state/hooks/useCellContext';
import styles from './add-cell.module.scss';
interface AddCellProps {
  previousCellId: string | null;
  forceVisible?: boolean;
}
const AddCell: React.FC<AddCellProps> = ({ forceVisible, previousCellId }) => {
  const {
    actions: { insertCellAfter }
  } = useCellContext();

  const stylesInline = {
    codeIcon: 'mr-2',
    noteIcon: 'mr-2'
  };

  return (
    <div
      className={[styles.addCell, forceVisible ? styles.forceVisible : ''].join(
        ' '
      )}
    >
      <div className={[styles.addButtons].join(' ')}>
        <Button
          onClick={() => insertCellAfter(previousCellId, 'code')}
          variant="outlined"
        >
          <CodeIcon className={stylesInline.codeIcon} /> Code
        </Button>
        <Button
          onClick={() => insertCellAfter(previousCellId, 'text')}
          variant="outlined"
        >
          <NotesIcon className={stylesInline.noteIcon} /> Text
        </Button>
      </div>
    </div>
  );
};

export default AddCell;
