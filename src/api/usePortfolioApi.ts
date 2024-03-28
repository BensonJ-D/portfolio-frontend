import axios, { AxiosInstance } from 'axios';
import { DateTime } from 'luxon';
import { AboutContent, AboutResponse, defaultAboutDetails } from './response/About';
import { useQuery, UseQueryResult } from 'react-query';
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';

const getAbout = (axiosClient: AxiosInstance): UseQueryResult<AboutContent> => {
  const queryKey = 'about';
  const queryFn = axiosClient.get('/about')
    .then(result => {
      const { data } = result;
      const { content, timestamp } = data as AboutResponse;

      return { content, timestamp: DateTime.fromISO(timestamp) } as AboutContent;
    });

  return useQuery(queryKey, () => queryFn);
};

const getContent = (page: string, axiosClient: AxiosInstance, token: String): UseQueryResult<AboutContent> => {
  const queryKey = `/pages/get-content/${page}`;
  const queryFn = axiosClient
    .get(`/pages/get-content/${page}`,
      { headers: { Authorization: `Bearer ${token}` } })
    .then(result => {
      const { data } = result;
      const { content, timestamp } = data as AboutResponse;

      return { content, timestamp: DateTime.fromISO(timestamp) } as AboutContent;
    });

  return useQuery(queryKey, () => queryFn);
};

const usePortfolioApi = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [token, setToken] = useState('');
  const axiosClient = axios.create({ baseURL: 'https://backend.local' });

  useEffect(() => {
    (async() => {
      const token = await getAccessTokenSilently({
        authorizationParams: {
          audience: 'https://backend.local',
          scope: 'read:content'
        }
      });
      setToken(token);
    })();
  }, [getAccessTokenSilently]);

  return {
    getAboutContent: () => getAbout(axiosClient),
    getPageContent: (page: string) => getContent(page, axiosClient, token)
  };
};

export default usePortfolioApi;
