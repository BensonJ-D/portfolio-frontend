import { Backdrop, CircularProgress, CssBaseline } from '@mui/material';
import Parallax from './Parallax';
import Navbar from './navbar/Navbar';
import { ContentWrapper } from './ContentWrapper';
import { Route, Routes, useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import ContentPage from './content/ContentPage';
import { useAuth0 } from '@auth0/auth0-react';
import { jwtDecode } from 'jwt-decode';
import { Auth0JwtPayload } from '../providers/Auth0Provider';
import EditContentPage from './content/EditContentPage';
import LivePreviewPage from './content/LivePreviewPage';

export const Content = () => {
  const { pathname } = useLocation();
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  const [renderNav, setRenderNav] = useState(true);
  const [loaderTimeout, setLoaderTimeout] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const [permissions, setPermissions] = useState<string[]>([]);
  useEffect(() => {
    isAuthenticated && getAccessTokenSilently({
      authorizationParams: {
        audience: 'https://backend.local',
        scope: 'default:admin'
      }
    }).then(jwt => {
      const token = jwtDecode<Auth0JwtPayload>(jwt);
      setPermissions(token.permissions);
    });
  }, [getAccessTokenSilently, isAuthenticated]);

  const setIsLoadingCallback = (newIsLoading: boolean) => {
    window.clearTimeout(loaderTimeout);
    if (!newIsLoading) {
      const timeout = window.setTimeout(() => setIsLoading(newIsLoading));
      setLoaderTimeout(timeout);
    } else {
      const timeout = window.setTimeout(() => setIsLoading(newIsLoading), 100);
      setLoaderTimeout(timeout);
    }
  };
  const checkAuth = useAuth0().isLoading;

  // Automatically scrolls to top whenever pathname changes
  useEffect(() => {
    setRenderNav(!pathname.startsWith('/live-preview'));
    window.scrollTo(0, 0);
  }, [pathname]);

  if (checkAuth) return null;

  return (
    <>
      <CssBaseline/>
      {renderNav && <Navbar />}
      <Parallax>
        <ContentWrapper noNav={!renderNav}>
          <Backdrop
            sx={{
              color: '#fff',
              zIndex: (theme) => theme.zIndex.drawer + 1
            }}
            open={isLoading}
          >
            <CircularProgress color="inherit"/>
          </Backdrop>
          <Routes>
            <Route path="/:page" element={<ContentPage isLoading={isLoading} setIsLoading={setIsLoadingCallback} permissions={permissions}/>} />
            <Route path="/live-preview/:liveSession" element={<LivePreviewPage />} />
            { permissions.includes('post:content') &&
              <Route path="/:page/edit" element={<EditContentPage isLoading={isLoading} setIsLoading={setIsLoadingCallback}/>} />}
            <Route path="*" element={<div>There be dragons here. Please leave.</div>} />
          </Routes>
        </ContentWrapper>
      </Parallax>
    </>
  );
};
