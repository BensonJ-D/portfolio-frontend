import React, { useState } from 'react';
import './MarkdownStyles.css';
import { useParams } from 'react-router-dom';
import ContentLastUpdatedTag from './components/ContentLastUpdatedTag';
import { ContentBody, ContentContainer, ContentFooter, ContentHeader } from './components/ContentLayout';
import { LivePreviewContentMessage, LivePreviewMessage } from './LivePreviewMessage';
import CustomMarkdown from './CustomMarkdown';

const LivePreviewPage = () => {
  const { liveSession } = useParams();
  if (!liveSession) return null;

  const [value, setValue] = useState<string | undefined>('');
  const [title, setTitle] = useState<string | undefined>('');

  const broadcastChannel = new BroadcastChannel(liveSession);
  broadcastChannel.postMessage({ type: 'ready' });
  broadcastChannel.onmessage = (event: any) => {
    const data: LivePreviewMessage = event.data;

    if (data.type === 'content') {
      const content = data as LivePreviewContentMessage;
      setTitle(content.title);
      setValue(content.content);
      window.focus();
    }
  };

  return (
    <>
      <ContentContainer>
        <ContentHeader>
          <CustomMarkdown>{title}</CustomMarkdown>
        </ContentHeader>
        <ContentBody>
          <CustomMarkdown>{value}</CustomMarkdown>
        </ContentBody>
        <ContentFooter>
          <ContentLastUpdatedTag />
        </ContentFooter>
      </ContentContainer>
    </>
  );
};

export default LivePreviewPage;
