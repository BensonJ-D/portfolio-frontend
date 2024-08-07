import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button, styled } from '@mui/material';

// const ProfileButton = styled('button')(() => ({
//   backgroundColor: 'transparent',
//   height: '2.25em',
//   width: '2.25em',
//   paddingTop: 0,
//   paddingBottom: 0,
//   borderRadius: '50%',
//   textAlign: 'center'
// }));

const ProfileIconWrapper = styled('div')(() => ({
  display: 'flex',
  boxAlign: 'center',
  alignItems: 'center',
  boxPack: 'center',
  justifyContent: 'center',
  position: 'relative',
  overflow: 'hidden',
  height: '1.5rem',
  width: '1.5rem',
  color: 'rgb(62, 62, 62)',
  backgroundColor: 'rgb(241, 241, 241)',
  fontSize: '0.75rem',
  fontWeight: '500',
  textTransform: 'uppercase',
  minWidth: 'unset',
  borderRadius: '50%'
}));

const ProfileIcon = styled('img')(() => ({
  width: '100%',
  height: '100%',
  textAlign: 'center',
  objectFit: 'cover',
  color: 'transparent',
  textIndent: '10000px'
}));

const LogoutButton = () => {
  const { user, logout } = useAuth0();
  return (
    <Button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
      // sx={{
      //   width: '400px'
      // }}
    >
      <ProfileIconWrapper>
        <ProfileIcon src={user?.picture} />
      </ProfileIconWrapper>
    </Button>
  );
};

export default LogoutButton;
