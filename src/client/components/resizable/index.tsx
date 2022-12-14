import { useEffect, useState } from 'react';
import { ResizableBox, ResizableBoxProps } from 'react-resizable';
import styles from './resizable.module.scss';
// import 'resizable.scss'
export interface ResizableProps {
  direction: 'horizontal' | 'vertical';
  children: JSX.Element;
  onResizeStart?: (e: any) => void;
  onResizeStop?: (e: any) => void;
  height?: number;
}

const Resizable: React.FC<ResizableProps> = ({
  onResizeStart,
  onResizeStop,
  direction,
  children
}) => {
  const [resizableProps, setResizableProps] = useState<ResizableBoxProps>(null);
  useEffect(() => {
    if (direction === 'horizontal') {
      // horizontal
      setResizableProps({
        onResizeStart: onResizeStart,
        onResizeStop: onResizeStop,
        className: [styles.resizableBox, styles.resizeHorizontal].join(' '),
        minConstraints: [window.innerWidth * 0.2, Infinity],
        maxConstraints: [window.innerWidth * 0.75, Infinity],
        height: Infinity,
        width: window.innerWidth * 0.75,
        handle: (
          <div
            className={[
              styles.reactResizableHandleE,
              styles.reactResizableHandle
            ].join(' ')}
          ></div>
        )
      });
    } else {
      // vertical
      setResizableProps({
        onResizeStart: onResizeStart,
        onResizeStop: (a: any) => {
          onResizeStop(a);
        },
        className: [styles.resizableBox].join(' '),
        minConstraints: [Infinity, 24],
        maxConstraints: [Infinity, window.innerHeight * 0.9],
        height: 700,
        width: Infinity,
        handle: (
          <div
            className={[
              styles.reactResizableHandleS,
              styles.reactResizableHandle
            ].join(' ')}
          ></div>
        )
      });
    }
  }, [direction, onResizeStart, onResizeStop]);

  if (!resizableProps || !resizableProps.width) return;
  return (
    <div
    // style={{
    //   marginBottom: 12,
    //   paddingBottom: 30
    // }}
    >
      <ResizableBox {...resizableProps}>{children}</ResizableBox>
    </div>
  );
};

export default Resizable;
