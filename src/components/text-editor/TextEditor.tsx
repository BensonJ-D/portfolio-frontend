import React from 'react';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { EditorState } from 'draft-js';
import { Editor, EditorState } from 'draft-js';

function TextEditor() {
  const [editorState, setEditorState] = React.useState(
    () => EditorState.createEmpty()
  );

  return <Editor editorState={editorState} onChange={setEditorState} />;
}

export default TextEditor;
