import '@uiw/react-markdown-preview/markdown.css';
import MDEditor from '@uiw/react-md-editor';
import '@uiw/react-md-editor/markdown-editor.css';
import dynamic from 'next/dynamic';
import { memo, useRef, useState } from 'react';
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
  { ssr: false }
);
export interface TextEditorProps {
  className?: string;
  value: string;
  onChange: (content: string) => void;
}
const TextEditor: React.FC<TextEditorProps> = ({
  className,
  value,
  onChange
}: TextEditorProps) => {
  // const [value, setValue] = useState<string>();

  const ref = useRef<HTMLDivElement | null>(null);
  const [editing, setEditing] = useState(false);
  const [content, setContent] = useState(value);

  // useEffect(() => {
  //   const listener = (event: MouseEvent) => {
  //     if (
  //       ref.current &&
  //       event.target &&
  //       ref.current.contains(event.target as Node)
  //     ) {
  //       return;
  //     }

  //     setEditing(false);
  //   };
  //   document.addEventListener('click', listener, { capture: true });

  //   return () => {
  //     document.removeEventListener('click', listener, { capture: true });
  //   };
  // }, []);

  console.log('rerender', Math.random());
  // if (editing) {
  return (
    <div className={styles.textEditor} ref={ref}>
      <MDEditorComponent
        value={content}
        height={500}
        onChange={(v) => {
          setContent(v);
          debounce(() => onChange(v), 1000, false)();
        }}
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
        <EditorMarkdown source={value || 'Click to edit'} />
      </div>
    </div>
  );
};

export default memo(TextEditor);

const debounce = (func, wait, immediate) => {
  console.log('hiiiiiiiii');

  let timeout;

  return function executedFunction(this: any) {
    let context: any = this;
    let args = arguments;

    let later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    let callNow = immediate && !timeout;

    clearTimeout(timeout);

    timeout = setTimeout(later, wait);

    if (callNow) func.apply(context, args);
  };
};
