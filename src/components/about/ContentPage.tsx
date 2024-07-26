import { Backdrop, CircularProgress, styled, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';

import { ReactTextEditorContext } from '../text-editor/TextEditorContext';
import './MarkdownStyles.css';

import { useAuth0 } from '@auth0/auth0-react';
import useAxios from '../../api/useAxios';
import { DateTime } from 'luxon';
import ReactMarkdown from 'react-markdown';
import { UseQueryResult, useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import remarkGfm from 'remark-gfm';
import { AboutContent, AboutResponse, defaultAboutDetails } from '../../api/response/About';
import { TextEditor } from '../text-editor/TextEditor';
import ContentLastUpdatedTag from './components/ContentLastUpdatedTag';

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

type QueryRequest = {
  queryKey: string, 
  queryFn: Promise<AboutContent>
}

export default function ContentPage() {
  const { page } = useParams();
  console.log('Page', page);
  if (!page) return null;

  const { getAccessTokenSilently, isAuthenticated, user } = useAuth0();
  const { axiosClient } = useAxios();
  const [content, setContent] = useState<AboutContent>()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    (async() => {
      try {
        setIsLoading(true)
        const token = await getAccessTokenSilently({
          authorizationParams: {
            audience: 'https://backend.local',
            scope: 'read:content'
          }
        });
        console.log(token)
        const response = await axiosClient
          .get(`/pages/get-content/${page}`,
            { headers: { Authorization: `Bearer ${token}` } })
          .then(result => {
            const { data } = result;
            const { content, timestamp } = data as AboutResponse;
    
            return { content, timestamp: DateTime.fromISO(timestamp) } as AboutContent;
          });
        setContent(response);
        setIsLoading(false)
      } catch (e) {
        // Handle errors such as `login_required` and `consent_required` by re-prompting for a login
        console.error(e);
      }
    })();
  }, [getAccessTokenSilently, isAuthenticated]);


  const markdownOptions = {
    overrides: {
      p: MarkdownParagraph
    }
  };

  const theme = useTheme();

  const [text, setText] = useState<string>('');
  const textProviderState = {
    value: text,
    setValue: setText
  };

  if (!content || isLoading) return null
  const about = content || defaultAboutDetails;
  // setDetails(data || defaultAboutDetails);
  console.log('User', user);

  return (
    <div>
    {/* // <ReactTextEditorContext.Provider value={textProviderState}> */}
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
          {/* <TextEditor /> */}
        </AboutBody>
      </AboutContainer>
    {/* </ReactTextEditorContext.Provider> */}
    </div>
  );
}
