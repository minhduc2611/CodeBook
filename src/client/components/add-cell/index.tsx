import CodeIcon from '@mui/icons-material/Code';
import NotesIcon from '@mui/icons-material/Notes';
import { IconButton } from '@mui/material';
import Image from 'next/image';
import { IInsertCellAfterAction } from './../../../client/state/reducers/article/cell.actions';
import { CellTypes } from './../../../client/state/types/cell';
import styles from './add-cell.module.scss';
export interface AddCellProps {
  previousCellId: string | null;
  forceVisible?: boolean;
  insertCellAfter: (
    id: string | null,
    cellType: CellTypes
  ) => IInsertCellAfterAction;
}
const AddCell: React.FC<AddCellProps> = ({
  forceVisible,
  previousCellId,
  insertCellAfter
}) => {
  const stylesInline = {
    codeIcon: 'mr-2',
    noteIcon: 'mr-2',
    div1: [styles.hovererWrapper, styles.zIndex200].join(' '),
    div2: [styles.hovererWrapper].join(' '),
    threeDotsWrapper: [
      styles.threeDotsHoverer,
      forceVisible ? styles.invisible : ''
    ].join(' ')
  };

  return (
    <div className={[styles.mainWrapper].join(' ')}>
      <div className={stylesInline.div1}>
        <div
          className={[
            styles.addCell,
            forceVisible ? styles.forceVisible : ''
          ].join(' ')}
        >
          <div className={[styles.addButtons].join(' ')}>
            <IconButton onClick={() => insertCellAfter(previousCellId, 'code')}>
              <CodeIcon className={stylesInline.codeIcon} />
            </IconButton>
            <IconButton onClick={() => insertCellAfter(previousCellId, 'text')}>
              <NotesIcon className={stylesInline.noteIcon} />
            </IconButton>
            <IconButton onClick={() => insertCellAfter(previousCellId, 'text')}>
              <NotesIcon className={stylesInline.noteIcon} />
            </IconButton>
          </div>
        </div>
      </div>
      <div className={[stylesInline.div2].join(' ')}>
        <div className={stylesInline.threeDotsWrapper}>
          <Image
            style={{
              borderRadius: '14px',
              border: '1px solid gray',
              padding: '1px 21px',
              margin: '10px',
              height: 30
            }}
            color="gray"
            src={'/assets/svg/three-dots.svg'}
            alt="three-dots"
          />
        </div>
      </div>
    </div>
  );
};

export default AddCell;
