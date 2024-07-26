import * as React from 'react';
import { Button, styled } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from './authentication/LoginButton';
import LogoutButton from './authentication/LogoutButton';

const AppBarContent = styled('div')(({ theme }) => {
  return {
    boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)',
    position: 'fixed',
    alignItems: 'center',
    backgroundColor: theme.palette.appbar.default,
    columnCount: 2,
    zIndex: 1100,
    width: '100%'
  };
});

const LeftSideAligned = styled('div')(({ theme }) => {
  return {
    display: 'flex',
    justifyContent: 'flex-start'
  };
});

const RightSideAligned = styled('div')(({ theme }) => {
  return {
    display: 'flex',
    justifyContent: 'flex-end'
  };
});

export default function Navbar() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const Profile = isAuthenticated ? LogoutButton : LoginButton
  const navigate = useNavigate();

  const handleAboutClick = () => {
    navigate('/about');
  };

  const handleReuVestiaClick = () => {
    navigate('/urrick');
  };

  return (
    <AppBarContent>
      <LeftSideAligned>
        <Button size="medium" onClick={handleAboutClick}>{'About'}</Button>
        <Button size="medium">{'Projects'}</Button>
        <Button size="medium" onClick={handleReuVestiaClick}>{"Reu'Vestia"}</Button>
        <Button size="medium">{'Contact Us'}</Button>
      </LeftSideAligned>
      <RightSideAligned>
        <Profile />
      </RightSideAligned>
    </AppBarContent>
  );
}
