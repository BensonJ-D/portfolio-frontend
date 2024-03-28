import React, { useEffect } from 'react';

import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { ContentEditableStyle } from './styles/ContentEditableStyle';
import { EditorPlaceholder } from './components/EditorPlaceholder';
import { EditorContainer } from './components/EditorContainer';
import EditorTheme from './EditorTheme';
import TreeViewPlugin from './plugins/TreeViewPlugin';
import {
  $convertFromMarkdownString,
  TRANSFORMERS
} from '@lexical/markdown';
import { PlainTextPlugin } from '@lexical/react/LexicalPlainTextPlugin';
import { useTextEditorContext } from './TextEditorContext';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

const ControlledInputPlugin = ({ value }: {value: string}) => {
  const [editor] = useLexicalComposerContext();

  console.log(value);
  useEffect(() => {
    editor.update(() => {
      $convertFromMarkdownString(value, TRANSFORMERS);
    });
  }, [editor, value]);

  return null;
};

export const PlainTextEditor = () => {
  const { value } = useTextEditorContext();

  const initialConfig = {
    namespace: 'MyEditor',
    theme: EditorTheme,
    onError: (error: Error) => { throw error; }
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <EditorContainer>
        <PlainTextPlugin
          contentEditable={<ContentEditable className={ContentEditableStyle}/>}
          placeholder={<EditorPlaceholder>Enter some text...</EditorPlaceholder>}
        />
        <HistoryPlugin />
        <TreeViewPlugin />
        <ControlledInputPlugin value={value} />
      </EditorContainer>
    </LexicalComposer>
  );
};
