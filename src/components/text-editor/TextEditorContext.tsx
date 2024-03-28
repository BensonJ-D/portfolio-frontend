import React, { useContext } from 'react';

export interface TextEditorContext {
    value: string,
    setValue: (newVal: string) => void
}

const initialContext: TextEditorContext = {
  value: '',
  setValue: (newVal: string) => {}
};

export const ReactTextEditorContext = React.createContext<TextEditorContext>(initialContext);
export const useTextEditorContext = () => useContext<TextEditorContext>(ReactTextEditorContext);
