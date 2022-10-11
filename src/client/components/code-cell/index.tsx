import { memo, useCallback, useState } from 'react';
import { useBundler } from 'src/client/hooks';
import CodeEditor from '../code-editor';
import Preview from '../preview';
import Resizable from '../resizable';
import styles from './code-cell.module.scss';

export interface CodeCellProps {
  className?: string;
  onChange: (value: string) => void;
  initialValue: string;
}

const CodeCell: React.FC<CodeCellProps> = ({
  className,
  onChange,
  initialValue
}) => {
  // const {
  //   actions: { updateCell }
  // } = useCellContext();

  const cellContentSetter = useCallback((value: string) => {
    onChange(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { setInput, doBundleCode, code, errorString } = useBundler({
    initiateInput: initialValue,
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
                initialValue={initialValue}
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
