import { useEffect, useState } from 'react';
import { ResizableBox, ResizableBoxProps } from 'react-resizable';
import styles from './resizable.module.scss';
interface ResizableProps {
  direction: 'horizontal' | 'vertical';
  children: JSX.Element;
  onResizeStart?;
  onResizeStop?;
}

const Resizable: React.FC<ResizableProps> = ({
  onResizeStart,
  onResizeStop,
  direction,
  children,
}) => {
  const [resizableProps, setResizableProps] = useState<ResizableBoxProps>(null);
  useEffect(() => {
    if (direction === 'horizontal') {
      // horizontal

      setResizableProps({
        onResizeStart: onResizeStart,
        onResizeStop: onResizeStop,
        className: 'resize-horizontal',
        minConstraints: [window.innerWidth * 0.2, Infinity],
        maxConstraints: [window.innerWidth * 0.75, Infinity],
        height: Infinity,
        width: window.innerWidth * 0.75,
        resizeHandles: ['e'],
        // handle:(<div className="react-resizable-handle-e" style={{display: 'inline-block'}}>hellooo</div>)
      });
    } else {
      // vertical
      setResizableProps({
        onResizeStart: onResizeStart,
        onResizeStop: onResizeStop,
        minConstraints: [Infinity, 24],
        maxConstraints: [Infinity, window.innerHeight * 0.9],
        height: 700,
        width: Infinity,
        resizeHandles: ['s'],
      });
    }
  }, [direction]);

  if (!resizableProps || !resizableProps.width) return;
  return <ResizableBox className={styles.resizableBox} {...resizableProps}>{children}</ResizableBox>;
};

export default Resizable;
