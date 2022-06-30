import React, { useMemo, useState } from 'react';
import { createEditor, BaseEditor, Descendant, BaseText } from 'slate';
import { Slate, Editable, withReact, ReactEditor } from 'slate-react';
import { HistoryEditor } from 'slate-history';

type CustomText = {
  bold?: boolean;
  code?: boolean;
  italic?: boolean;
  underlined?: boolean;
} & BaseText

type CustomElement = { type: 'paragraph'; children: CustomText[] }

declare module 'slate' {
  interface CustomTypes { // eslint-disable-line
    Editor: BaseEditor & ReactEditor & HistoryEditor
    Element: CustomElement
    Text: CustomText
  }
}

export const TextEditor = () => {
  const editor = useMemo(() => withReact(createEditor()), []);
  const [value, setValue] = useState<Descendant[]>([{ type: 'paragraph', children: [{ text: '' }] }]);
  return (
    <Slate
      editor={editor}
      value={value}
      onChange={(newValue) => setValue(newValue)}
    >
      <Editable />
    </Slate>
  );
};
