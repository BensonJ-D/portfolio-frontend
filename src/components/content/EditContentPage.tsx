import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import './MarkdownStyles.css';
import { useNavigate, useParams } from 'react-router-dom';
import usePortfolioApi from '../../api/usePortfolioApi';
import MDEditor from '@uiw/react-md-editor';
import rehypeSanitize from 'rehype-sanitize';

import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import SkeletonWrapper from '../SkeletonWrapper';
import { ContentBody, ContentContainer, ContentFooter, ContentHeader } from './components/ContentLayout';
import { LivePreviewContentMessage, LivePreviewMessage } from './LivePreviewMessage';

const EditContentPage = ({ isLoading, setIsLoading }: { isLoading: boolean, setIsLoading: (isLoading: boolean) => void}) => {
  const navigate = useNavigate();
  const { page } = useParams();
  if (!page) return null;

  const [sessionId] = useState(crypto.randomUUID());
  const [broadcastChannel] = useState(new BroadcastChannel(sessionId));
  const [preview, setPreview] = useState<Window | null>();
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');

  const { getPageContent, postSecuredPageContent } = usePortfolioApi();
  const { isLoading: isRequestLoading, isFetching: isRequestFetching, data } = getPageContent(`pages/get-content/${page}`);

  useEffect(() => {
    setIsLoading(isRequestLoading || isRequestFetching);
  }, [isRequestLoading, isRequestFetching]);

  useEffect(() => {
    if (!data) return;

    setTitle(data.title);
    setContent(data.content);
  }, [data]);

  const onClickSave = async() => {
    if (preview) {
      preview.close();
    }

    setIsLoading(true);
    await postSecuredPageContent(page, title, content);
    navigate(`/${page}`);
  };

  const onCancel = async() => {
    if (preview) {
      preview.close();
    }

    navigate(`/${page}`);
  };

  const onClickPopoutPreview = () => {
    if (preview) {
      preview.close();
    }

    setPreview(window.open(`/live-preview/${sessionId}`, '_blank', 'toolbar=0,location=0,menubar=0,height=400,width=400'));
  };

  broadcastChannel.onmessage = (event: any) => {
    const data: LivePreviewMessage = event.data;

    if (data.type === 'ready') {
      const message: LivePreviewContentMessage = {
        type: 'content',
        title,
        content
      };

      broadcastChannel.postMessage(message);
    }
  };

  useEffect(() => {
    const message: LivePreviewContentMessage = {
      type: 'content',
      title,
      content
    };

    broadcastChannel.postMessage(message);
  }, [title, content]);

  return (
    <div>
      {!isLoading &&
        <ContentContainer>
          <ContentHeader>
            <SkeletonWrapper disabled={!isLoading}>
              Title
              <MDEditor
                preview={'edit'}
                height={0}
                minHeight={0}
                value={title}
                onChange={val => setTitle(val || '')}
                previewOptions={{
                  rehypePlugins: [[rehypeSanitize]]
                }}
                textareaProps={{
                  maxLength: 50,
                  rows: 1,
                  wrap: 'off'
                }}
                hideToolbar={true}
                visibleDragbar={false}
                enableScroll={false}
                overflow={false}
              />
            </SkeletonWrapper>
          </ContentHeader>
          <ContentBody>
            <SkeletonWrapper disabled={!isLoading}>
              Content
              <MDEditor
                preview={'edit'}
                height={500}
                value={content}
                onChange={val => setContent(val || '')}
                previewOptions={{
                  rehypePlugins: [[rehypeSanitize]]
                }}
              />
            </SkeletonWrapper>
          </ContentBody>
          <ContentFooter>
            <SkeletonWrapper disabled={!isLoading}>
              <Button onClick={onClickSave}>
              Save
              </Button>
              <Button onClick={onClickPopoutPreview}>
                Toggle Live Preview
              </Button>
              <Button onClick={onCancel}>
                Cancel
              </Button>
            </SkeletonWrapper>
          </ContentFooter>
        </ContentContainer> }
    </div>
  );
};

export default EditContentPage;
