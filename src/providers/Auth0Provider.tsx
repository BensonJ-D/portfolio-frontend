import { AppState, Auth0Provider as Provider } from '@auth0/auth0-react';
import React, { PropsWithChildren } from 'react';
import { useNavigate } from 'react-router-dom';

export const Auth0Provider: React.FC<PropsWithChildren> = ({ children }) => {
  const navigate = useNavigate();

  const domain = 'dev-jdb.au.auth0.com';
  const clientId = '1Wwrx91RgTdIsT4RgY5D2AMGe87LvDjx';

  const redirectUri = 'https://frontend.local/callback';

  const onRedirectCallback = (appState?: AppState) => {
    navigate(appState?.returnTo || window.location.pathname);
  };

  if (!(domain && clientId)) {
    return null;
  }

  return (
    <Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectUri
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Provider>
  );
};
