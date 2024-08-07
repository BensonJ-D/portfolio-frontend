import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import './MarkdownStyles.css';
import { useNavigate, useParams } from 'react-router-dom';
import ContentLastUpdatedTag from './components/ContentLastUpdatedTag';
import usePortfolioApi from '../../api/usePortfolioApi';
import SkeletonWrapper from '../SkeletonWrapper';
import { ContentBody, ContentContainer, ContentFooter, ContentHeader } from './components/ContentLayout';
import CustomMarkdown from './CustomMarkdown';

const ContentPage = ({ isLoading, setIsLoading, permissions }: { isLoading: boolean, setIsLoading: (isLoading: boolean) => void, permissions: string[]}) => {
  const navigate = useNavigate();
  const { page } = useParams();
  if (!page) return null;

  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');

  const { getPageContent } = usePortfolioApi();
  const {
    isLoading: isRequestLoading,
    isFetching: isRequestFetching,
    data
  } = getPageContent(`pages/get-content/${page}`);

  useEffect(() => {
    setIsLoading(isRequestLoading || isRequestFetching);
  }, [isRequestLoading, isRequestFetching]);

  useEffect(() => {
    if (data) {
      setTitle(data.title);
      setContent(data.content);
    }
  }, [data]);

  const onClickEdit = () => navigate(`/${page}/edit`);

  return (
    <>
      <ContentContainer>
        <ContentHeader>
          <SkeletonWrapper disabled={!isLoading}>
            <CustomMarkdown>{title}</CustomMarkdown>
          </SkeletonWrapper>
        </ContentHeader>
        <ContentBody>
          <SkeletonWrapper disabled={!isLoading}>
            <CustomMarkdown>{content}</CustomMarkdown>
          </SkeletonWrapper>
        </ContentBody>
        <ContentFooter>
          <SkeletonWrapper disabled={!isLoading}>
            <ContentLastUpdatedTag timestamp={data?.timestamp}/>
            { permissions.includes('post:content') &&
            <Button size="medium" onClick={onClickEdit}>{'Edit'}</Button>
            }
          </SkeletonWrapper>
        </ContentFooter>
      </ContentContainer>
    </>
  );
};

export default ContentPage;
