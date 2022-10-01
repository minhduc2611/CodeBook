import '@uiw/react-markdown-preview/markdown.css';
import MDEditor from '@uiw/react-md-editor';
import '@uiw/react-md-editor/markdown-editor.css';
import dynamic from 'next/dynamic';
import { memo, useEffect, useRef, useState } from 'react';
import { useCellContext } from './../../../client/state/hooks/useCellContext';
import { Cell } from './../../../client/state/types/cell';
import styles from './text-editor.module.scss';
const MDEditorComponent = dynamic<React.ComponentProps<typeof MDEditor>>(
  () => import('@uiw/react-md-editor').then((mod) => mod.default),
  { ssr: false }
);
const EditorMarkdown = dynamic<React.ComponentProps<typeof MDEditor.Markdown>>(
  () =>
    import('@uiw/react-md-editor').then((mod) => {
      return mod.default.Markdown;
    }),
  { ssr: false, }
);
interface TextEditorProps {
  className?: string;
  cell: Cell;
}
const TextEditor: React.FC<TextEditorProps> = ({
  className,
  cell
}: TextEditorProps) => {
  // const [value, setValue] = useState<string>();

  const ref = useRef<HTMLDivElement | null>(null);
  const [editing, setEditing] = useState(false);
  const {
    actions: { updateCell }
  } = useCellContext();
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (
        ref.current &&
        event.target &&
        ref.current.contains(event.target as Node)
      ) {
        return;
      }

      setEditing(false);
    };
    document.addEventListener('click', listener, { capture: true });

    return () => {
      document.removeEventListener('click', listener, { capture: true });
    };
  }, []);

  // if (editing) {
    return (
      <div className={styles.textEditor} ref={ref}>
        <MDEditorComponent
          value={cell.content}
          height={500}
          onChange={(v) => updateCell(cell.id, v || '')}
        />
      </div>
    );
  // }

  return (
    <div
      className={[
        className,
        styles.textEditor,
        styles.card,
        'textEditor card'
      ].join(' ')}
      onClick={() => setEditing(true)}
    >
      <div className="card-content">
        <EditorMarkdown source={cell.content || 'Click to edit'} />
      </div>
    </div>
  );
};

export default memo(TextEditor);
