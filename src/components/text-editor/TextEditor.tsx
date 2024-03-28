import { EditorState } from 'lexical';
import React from 'react';

import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { ContentEditableStyle } from './styles/ContentEditableStyle';
import { EditorPlaceholder } from './components/EditorPlaceholder';
import { EditorContainer } from './components/EditorContainer';
import EditorTheme from './EditorTheme';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import TreeViewPlugin from './plugins/TreeViewPlugin';
import { useTextEditorContext } from './TextEditorContext';
import {
  $convertToMarkdownString,
  TRANSFORMERS
} from '@lexical/markdown';
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { ListItemNode, ListNode } from '@lexical/list';

export const TextEditor = () => {
  const { setValue } = useTextEditorContext();

  const initialConfig = {
    namespace: 'MyEditor',
    theme: EditorTheme,
    onError: (error: Error) => { throw error; },
    nodes: [
      HeadingNode,
      ListNode,
      ListItemNode,
      QuoteNode
    ]
  };

  const onChange = (editorState: EditorState) => {
    editorState.read(() => {
      const markdown = $convertToMarkdownString(TRANSFORMERS);
      setValue(markdown);
    });
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <EditorContainer>
        <RichTextPlugin
          contentEditable={<ContentEditable className={ContentEditableStyle}/>}
          placeholder={<EditorPlaceholder>Enter some text...</EditorPlaceholder>}
        />
        <OnChangePlugin onChange={onChange} />
        <HistoryPlugin />
        <TreeViewPlugin />
        <ListPlugin />
        <MarkdownShortcutPlugin />
      </EditorContainer>
    </LexicalComposer>
  );
};
