import React from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';
import '../../styles/text-editor.css';

// Custom overrides for "code" style.
const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2
  }
};

// function getBlockStyle(block) {
//   switch (block.getType()) {
//     case 'blockquote': return 'RichEditor-blockquote';
//     default: return null;
//   }
// }

const StyleButton = (props: { active: boolean, style: string, label: string, onToggle: (blockType: string) => void }) => {
  const onToggle = (e: any) => {
    e.preventDefault();
    props.onToggle(props.style);
  };

  let className = 'RichEditor-styleButton';
  if (props.active) {
    className += ' RichEditor-activeButton';
  }
  return (
    <span className={className} onMouseDown={onToggle}>
      {props.label}
    </span>
  );
};

const BLOCK_TYPES = [
  { label: 'H1', style: 'header-one' },
  { label: 'H2', style: 'header-two' },
  { label: 'H3', style: 'header-three' },
  { label: 'H4', style: 'header-four' },
  { label: 'H5', style: 'header-five' },
  { label: 'H6', style: 'header-six' },
  { label: 'Blockquote', style: 'blockquote' },
  { label: 'UL', style: 'unordered-list-item' },
  { label: 'OL', style: 'ordered-list-item' },
  { label: 'Code Block', style: 'code-block' }
];

const BlockStyleControls = (props: { editorState: EditorState, onToggle: (blockType: string) => void }) => {
  const { editorState } = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
      <div className="RichEditor-controls">
        {BLOCK_TYPES.map((type) =>
            <StyleButton
                key={type.label}
                active={type.style === blockType}
                label={type.label}
                onToggle={props.onToggle}
                style={type.style}
            />
        )}
      </div>
  );
};

const INLINE_STYLES = [
  { label: 'Bold', style: 'BOLD' },
  { label: 'Italic', style: 'ITALIC' },
  { label: 'Underline', style: 'UNDERLINE' },
  { label: 'Monospace', style: 'CODE' }
];

const InlineStyleControls = (props: { editorState: EditorState, onToggle: (inlineStyle: string) => void }) => {
  const currentStyle = props.editorState.getCurrentInlineStyle();
  return (
      <div className="RichEditor-controls">
        {INLINE_STYLES.map(type =>
            <StyleButton
                key={type.label}
                active={currentStyle.has(type.style)}
                label={type.label}
                onToggle={props.onToggle}
                style={type.style}
            />
        )}
      </div>
  );
};

const getBlockStyle = (block: any) => {
  if (block.getType() === 'blockquote') {
    return 'RichEditor-blockquote';
  } else {
    return '';
  }
};

const TextEditor = () => {
  const maxDepth = 4;
  const editor = React.useRef<Editor>(null);
  const [editorState, setEditorState] = React.useState(EditorState.createEmpty());

  const focusEditor = React.useCallback(() => {
    if (editor.current) {
      editor.current.focus();
      console.log(editor);
    }
  }, [editor]);

  const handleKeyCommand = (command: string) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return 'handled';
    }
    return 'not-handled';
  };

  const onChange = (newState: EditorState) => setEditorState(newState);
  const onTab = (e: React.KeyboardEvent<{}>) => setEditorState(RichUtils.onTab(e, editorState, maxDepth));
  const toggleBlockType = (blockType: string) => setEditorState(RichUtils.toggleBlockType(editorState, blockType));
  const toggleInlineStyle = (inlineStyle: string) => setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));

  // If the user changes block type before entering any text, we can
  // either style the placeholder or hide it. Let's just hide it now.
  let className = 'RichEditor-editor';
  const contentState = editorState.getCurrentContent();
  if (!contentState.hasText()) {
    if (contentState.getBlockMap().first().getType() !== 'unstyled') {
      className += ' RichEditor-hidePlaceholder';
    }
  }

  return (
      <div className="RichEditor-root">
        <BlockStyleControls
            editorState={editorState}
            onToggle={toggleBlockType}
        />
        <InlineStyleControls
            editorState={editorState}
            onToggle={toggleInlineStyle}
        />
        <div className={className} onClick={focusEditor}>
          <Editor
              blockStyleFn={getBlockStyle}
              customStyleMap={styleMap}
              editorState={editorState}
              handleKeyCommand={handleKeyCommand}
              onChange={onChange}
              onTab={onTab}
              placeholder="Tell a story..."
              ref={editor}
              spellCheck={true}
          />
        </div>
      </div>
  );
};

export default TextEditor;
