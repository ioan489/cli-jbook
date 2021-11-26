import './code-editor.css';
import { useRef } from 'react';
import MonacoEditor, { OnMount } from '@monaco-editor/react';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';

interface CodeEditorProps {
  initialValue: string;
  onChange: (e: string) => any;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue, onChange }) => {
  const editorRef = useRef<any>(null);

  const onEditorDidMount: OnMount = (editor) => {
    editorRef.current = editor;
    editor.onDidChangeModelContent(() => {
      onChange(editor.getValue());
    });
  };

  const onClickFormat = () => {
    const unformatted = editorRef.current.getModel().getValue();

    const formatted = prettier
      .format(unformatted, {
        parser: 'babel',
        plugins: [parser],
        useTabs: false,
        semi: true,
        singleQuote: true,
      })
      .replace(/\n$/, '');

    editorRef.current.setValue(formatted);
  };

  return (
    <div className="code-wrapper">
      <button
        className="button button-format is-primary is-small"
        onClick={onClickFormat}
      >
        Format
      </button>
      <MonacoEditor
        language="javascript"
        height="100%"
        theme="vs-dark"
        value={initialValue}
        onMount={onEditorDidMount}
        options={{
          wordWrap: 'on',
          minimap: { enabled: false },
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
      />
    </div>
  );
};

export default CodeEditor;
