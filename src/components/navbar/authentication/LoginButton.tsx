import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@mui/material';

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  const redirect = window.location.pathname;

  return <Button onClick={() => loginWithRedirect({ appState: { returnTo: redirect } })}>Log In</Button>;
};

export default LoginButton;
