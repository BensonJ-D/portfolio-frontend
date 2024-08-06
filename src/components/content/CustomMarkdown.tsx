import React from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkDirective from 'remark-directive';
import remarkDirectiveRehype from 'remark-directive-rehype';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace,no-unused-vars
  namespace JSX {
    // this merges with the existing intrinsic elements, adding 'my-custom-tag' and its props
    // eslint-disable-next-line no-unused-vars
    interface IntrinsicElements {
      'custom-tag': { id: string };
      'centre': { id: string, children?: string | undefined }
    }
  }
}

const CustomMarkdown = ({ children }: { children?: string | undefined }) => {
  return (
    <Markdown remarkPlugins={[remarkGfm, remarkDirective, remarkDirectiveRehype]} components={{
      'custom-tag': () => <div>Let&apos;s go!</div>
    }}>
      { children }
    </Markdown>
  );
};

export default CustomMarkdown;
