import { memo, useCallback, useState } from 'react';
import { Cell } from './../../../client/state/types/cell';
import { useCellContext } from './../../state/hooks/useCellContext';
import styles from './code-cell.module.scss';
import CodeEditor from './code-editor';
import useBundler from './hooks/useBundler';
import Preview from './preview';
import Resizable from './resizable';

export interface CodeCellProps {
  className?: string;
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ className, cell }) => {
  const {
    actions: { updateCell }
  } = useCellContext();

  const cellContentSetter = useCallback((value: string) => {
    updateCell(cell.id, value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { setInput, doBundleCode, code, errorString } = useBundler({
    initiateInput: cell.content,
    inputSetter: cellContentSetter
  });
  const [resizeInProgress, setResizeInProgress] = useState(false);
  return (
    <div className={['mb-3', className].join(' ')}>
      <Resizable
        onResizeStart={() => setResizeInProgress(true)}
        onResizeStop={() => setResizeInProgress(false)}
        direction="vertical"
      >
        <div
          id="code-cell-wrapper"
          style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'row'
          }}
        >
          <Resizable
            onResizeStart={() => setResizeInProgress(true)}
            onResizeStop={() => setResizeInProgress(false)}
            direction="horizontal"
          >
            <div
              style={{
                position: 'relative',
                height: '100%',
                width: 'calc(100% - 10px)',
                display: 'inline-block'
                // background: 'yellow',
              }}
            >
              <CodeEditor
                onSave={doBundleCode}
                initialValue={cell.content}
                onChange={setInput}
              />
            </div>
          </Resizable>
          <div className={styles.webConsole} id="web-console">
            <Preview
              shouldBlockUI={resizeInProgress}
              code={code}
              err={errorString}
            />
          </div>
        </div>
      </Resizable>
    </div>
  );
};

export default memo(CodeCell);