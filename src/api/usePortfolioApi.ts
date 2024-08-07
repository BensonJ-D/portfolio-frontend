import axios from 'axios';
import { DateTime } from 'luxon';
import { PageContent, PageResponse } from './response/Page';
import { useQuery } from 'react-query';
import { Auth0ContextInterface, useAuth0 } from '@auth0/auth0-react';

const usePortfolioApi = () => {
  const auth = useAuth0();
  const axiosClient = axios.create({ baseURL: 'https://backend.local' });

  const getFn = (page: string, headers?: object) => axiosClient
    .get(`${page}`,
      { headers: { ...headers } })
    .then(result => {
      const { data } = result;
      const { pageTitle, content, timestamp } = data as PageResponse;

      return { title: pageTitle, content, timestamp: DateTime.fromISO(timestamp) } as PageContent;
    }).catch(error => {
      console.log('Error retrieving content', error.code);
    }).finally(() => console.log('All done getting'));

  const getPageContent = async(page: string, auth?: Auth0ContextInterface) => {
    if (auth) {
      return auth.getAccessTokenSilently({
        authorizationParams: {
          audience: 'https://backend.local',
          scope: 'default:admin'
        }
      }).then(async(token) => {
        const headers = { Authorization: `Bearer ${token}` };
        return await getFn(page, headers);
      });
    } else {
      return await getFn(page);
    }
  };

  const postFn = (page: string, title: string, content: string, headers?: object) => axiosClient
    .post('pages',
      { route: page, pageTitle: title, content },
      { headers: { ...headers } })
    .catch(error => {
      console.log('Error posting content', error.code);
    }).finally(() => console.log('All done posting'));

  const postPageContent = async(page: string, title: string, content: string, auth?: Auth0ContextInterface) => {
    if (auth) {
      console.log('Started!');
      return auth.getAccessTokenSilently({
        authorizationParams: {
          audience: 'https://backend.local',
          scope: 'default:admin'
        }
      }).then(async(token) => {
        const headers = { Authorization: `Bearer ${token}` };
        console.log('Page', page);
        return await postFn(page, title, content, headers);
      });
    }
  };

  return {
    getPageContent: (page: string) => useQuery(page, () => getPageContent(page), {
      refetchOnWindowFocus: false
    }),
    getSecuredPageContent: (page: string) => useQuery(page, () => getPageContent(page, auth), {
      refetchOnWindowFocus: false
    }),
    postSecuredPageContent: (page: string, title: string, content: string) => postPageContent(page, title, content, auth)
  };
};

export default usePortfolioApi;
