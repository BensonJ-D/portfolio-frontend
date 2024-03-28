import React, { useContext, useEffect, useState } from 'react';
import { Backdrop, CircularProgress, styled, useTheme } from '@mui/material';
import usePortfolioApi from '../../api/usePortfolioApi';

import { ReactTextEditorContext } from '../text-editor/TextEditorContext';
import './MarkdownStyles.css';
import { WebSocketContext } from '../../utils/websockets/WebSocketProvider';
import { WebSocketListener } from '../../utils/websockets/types/WebSocketListener';

import { useLocation, useParams } from 'react-router-dom';
import { defaultAboutDetails } from '../../api/response/About';
import ReactMarkdown from 'react-markdown';
import ContentLastUpdatedTag from './components/ContentLastUpdatedTag';
import { TextEditor } from '../text-editor/TextEditor';
import remarkGfm from 'remark-gfm';
import { useAuth0 } from '@auth0/auth0-react';

const AboutContainer = styled('div')(({ theme }) => ({
  width: '50%',
  paddingLeft: '10px',
  paddingRight: '10px',
  paddingTop: '20px',
  paddingBottom: '20px',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  backgroundImage: 'url("/parchment.jpg")',
  backgroundColor: 'white'
}));

const AboutBody = styled('div')(({ theme }) => ({
  flexDirection: 'column',
  width: '60%',
  textAlign: 'left',
  paddingRight: theme.spacing(2),
  alignItems: 'left',
  columnCount: 2,
  columnGap: '20px'
}));

const AboutHeader = styled('div')(({ theme }) => ({
  fontSize: '1.875rem',
  lineHeight: '2.25rem',
  marginBottom: '4px',
  fontWeight: 500
}));

const MarkdownParagraph = styled('p')`
  padding-bottom: 0.8em;
  line-height: 1.269em;
  margin: 0px 0px;
  & + & {
    margin-top: -0.8em;
    text-indent: 1em;
  }
  span + & {
    text-indent: 1em;
  }
`;

export default function ContentPage() {
  const { addListener, removeListener } = useContext(WebSocketContext);
  const { page } = useParams();
  if (!page) return null;

  const { isAuthenticated, user } = useAuth0();

  const markdownOptions = {
    overrides: {
      p: MarkdownParagraph
    }
  };

  useEffect(() => {
    const listener = new WebSocketListener('Test', () => { console.log('Test 2'); });
    addListener(listener);
    return () => removeListener(listener);
  }, []);

  const theme = useTheme();
  const { getPageContent } = usePortfolioApi();
  const pageContent = getPageContent(page);

  if (!pageContent) return null;

  const { isLoading, error, data } = pageContent;

  const [text, setText] = useState<string>('');
  const textProviderState = {
    value: text,
    setValue: setText
  };

  const about = data || defaultAboutDetails;
  // setDetails(data || defaultAboutDetails);
  console.log('User', user);

  return (
    <ReactTextEditorContext.Provider value={textProviderState}>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <AboutContainer>
        <AboutHeader>
          <h1>Welcome{isAuthenticated && `, ${user?.name}`}!</h1>
        </AboutHeader>
        <AboutBody>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{about.content}</ReactMarkdown>
          <ContentLastUpdatedTag timestamp={ about.timestamp } />
          <TextEditor />
        </AboutBody>
      </AboutContainer>
    </ReactTextEditorContext.Provider>
  );
}
