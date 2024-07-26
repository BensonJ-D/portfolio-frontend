import React from 'react';

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { TreeView } from '@lexical/react/LexicalTreeView';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';

export default function TreeViewPlugin() {
  const [editor] = useLexicalComposerContext();
  return (
    <TreeView
      viewClassName="tree-view-output"
      treeTypeButtonClassName="debug-treetype-button"
      timeTravelPanelClassName="debug-timetravel-panel"
      timeTravelButtonClassName="debug-timetravel-button"
      timeTravelPanelSliderClassName="debug-timetravel-panel-slider"
      timeTravelPanelButtonClassName="debug-timetravel-panel-button"
      editor={editor}
    />
  );
}
