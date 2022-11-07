import MonacoEditor, {
  EditorProps,
  OnChange,
  OnMount
} from '@monaco-editor/react';
import * as MonacoTypes from 'monaco-editor/esm/vs/editor/editor.api';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';
import { useCallback, useRef, useState } from 'react';
import styles from './code-editor.module.scss';
import Dashboard from './components/dashboard';
export interface CodeEditorProps {
  initialValue?: string;
  onChange?(value: string): void;
  onSave?(): void;
}

// fancy dynamic loader attached to the @monaco-editor/react's onMount callback
const activateMonacoJSXHighlighter = async (monacoEditor, monaco) => {
  // monaco-jsx-highlighter depends on these in addition to Monaco and an instance of a Monaco Editor.
  const { default: traverse } = await import('@babel/traverse');
  const { parse } = await import('@babel/parser');
  // >>> The star of the show =P >>>
  const { default: MonacoJSXHighlighter, JSXTypes } = await import(
    'monaco-jsx-highlighter' // Note: there is a polyfilled version alongside the regular version.
  ); // For example, starting with 2.0.2, 2.0.2-polyfilled is also available.

  // Instantiate the highlighter
  const monacoJSXHighlighter = new MonacoJSXHighlighter(
    monaco, // references Range and other APIs
    parse, // obtains an AST, internally passes to parse options: {...options, sourceType: "module",plugins: ["jsx"],errorRecovery: true}
    traverse, // helps collecting the JSX expressions within the AST
    monacoEditor // highlights the content of that editor via decorations
  );
  // Start the JSX highlighting and get the dispose function
  let disposeJSXHighlighting =
    monacoJSXHighlighter.highlightOnDidChangeModelContent();
  // Enhance monaco's editor.action.commentLine with JSX commenting and get its disposer
  let disposeJSXCommenting = monacoJSXHighlighter.addJSXCommentCommand();
  // <<< You are all set. >>>

  // Optional: customize the color font in JSX texts (style class JSXElement.JSXText.tastyPizza from ./index.css)
  JSXTypes.JSXText.options.inlineClassName = 'JSXElement.JSXText.tastyPizza';
  // more details here: https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.IModelDecorationOptions.html
  console.log(
    "[INFO] Customize each JSX expression type's options, they must match monaco.editor.IModelDecorationOptions:",
    JSXTypes
  );

  // This example's shorthands for toggling actions
  const toggleJSXHighlighting = () => {
    if (disposeJSXHighlighting) {
      disposeJSXHighlighting();
      disposeJSXHighlighting = null;
      return false;
    }

    disposeJSXHighlighting =
      monacoJSXHighlighter.highlightOnDidChangeModelContent();
    return true;
  };

  const toggleJSXCommenting = () => {
    if (disposeJSXCommenting) {
      disposeJSXCommenting();
      disposeJSXCommenting = null;
      return false;
    }

    disposeJSXCommenting = monacoJSXHighlighter.addJSXCommentCommand();
    return true;
  };

  const isToggleJSXHighlightingOn = () => !!disposeJSXHighlighting;
  const isToggleJSXCommentingOn = () => !!disposeJSXCommenting;

  return {
    monacoJSXHighlighter,
    toggleJSXHighlighting,
    toggleJSXCommenting,
    isToggleJSXHighlightingOn,
    isToggleJSXCommentingOn
  };
};

const CodeEditor: React.FC<CodeEditorProps> = ({
  onSave = () => {},
  onChange = () => {},
  initialValue = ''
}) => {
  const [theme, setTheme] = useState('vs-dark');
  const [language, setLanguage] = useState('javascript');
  const [isEditorReady, setIsEditorReady] = useState(false);
  const [isJSXHighlightingOn, setIsJSXHighlightingOn] = useState(false);
  const [isJSXCommentingOn, setIsJSXCommentingOn] = useState(false);

  const monacoJSXHighlighterRef = useRef<any>();
  const theMonacoEditorRef = useRef<MonacoTypes.editor.IStandaloneCodeEditor>();

  const handleEditorDidMount: OnMount = useCallback((monacoEditor, monaco) => {
    activateMonacoJSXHighlighter(monacoEditor, monaco)
      .then((monacoJSXHighlighterRefCurrent) => {
        monacoJSXHighlighterRef.current = monacoJSXHighlighterRefCurrent;
        theMonacoEditorRef.current = monacoEditor;
        setIsEditorReady(!!monacoEditor);
        setIsJSXHighlightingOn(
          monacoJSXHighlighterRefCurrent.isToggleJSXHighlightingOn()
        );
        setIsJSXCommentingOn(
          monacoJSXHighlighterRefCurrent.isToggleJSXCommentingOn()
        );
      })
      .catch((e) => console.log('CodeEditor', e));
  }, []);
  const handleOnChange: OnChange = (value) => {
    onChange(value);
    theMonacoEditorRef.current.getModel()?.updateOptions({ tabSize: 2 });
  };

  const onFormatClick = () => {
    // get current value from editor
    const unformatted = theMonacoEditorRef.current.getModel().getValue();

    // format that value
    const formatted = prettier
      .format(unformatted, {
        parser: 'babel',
        plugins: [parser],
        useTabs: true,
        semi: true,
        singleQuote: true,
        tabWidth: 2
      })
      .replace(/\n$/, '');

    // set the formatted value back in the editor
    theMonacoEditorRef.current.setValue(formatted);
  };

  const toggleTheme = useCallback(() => {
    setTheme((theme) => (theme === 'light' ? 'vs-dark' : 'light'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const OnRunCode = useCallback(onSave, []);

  const toggleLanguage = useCallback(() => {
    setLanguage((language) =>
      language === 'javascript' ? 'python' : 'javascript'
    );
  }, []);

  const toggleJSXHighlighting = useCallback(() => {
    setIsJSXHighlightingOn(
      !!monacoJSXHighlighterRef.current?.toggleJSXHighlighting()
    );
  }, []);

  const toggleJSXCommenting = useCallback(() => {
    setIsJSXCommentingOn(
      !!monacoJSXHighlighterRef.current?.toggleJSXCommenting()
    );
  }, []);
  console.log('code cell initialValue', initialValue);
  const editorProps: EditorProps = {
    theme,
    language,
    // height: "calc(100% - 19px)",
    onMount: handleEditorDidMount,
    onChange: handleOnChange,
    value: initialValue,
    height: '100%',
    options: {
      wordWrap: 'on',
      minimap: { enabled: false },
      showUnused: false,
      folding: false,
      lineNumbersMinChars: 3,
      fontSize: 16,
      scrollBeyondLastLine: false,
      automaticLayout: true
    }
  };
  const dashboardProps = {
    jsxEnabled: isEditorReady && language === 'javascript',
    monacoEnabled: isEditorReady,
    isJSXHighlightingOn,
    toggleJSXHighlighting,
    isJSXCommentingOn,
    toggleJSXCommenting,
    theme,
    toggleTheme,
    language,
    toggleLanguage,
    onFormatClick,
    OnRunCode
  };
  return (
    <div
      style={{ background: 'black', width: '100%' }}
      className={[styles.editorWrapper, 'custom-monaco-editor'].join(' ')}
    >
      <Dashboard {...dashboardProps} />
      <MonacoEditor {...editorProps} />
    </div>
  );
};

export default CodeEditor;
