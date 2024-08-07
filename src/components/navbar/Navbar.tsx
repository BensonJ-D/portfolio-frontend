import * as React from 'react';
import { Button, styled } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from './authentication/LoginButton';
import LogoutButton from './authentication/LogoutButton';

const NavBarWrapper = styled('header')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  boxSizing: 'border-box',
  position: 'fixed',
  left: 'auto',
  right: '0px',
  boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
  height: '56px',
  zIndex: 1100,
  top: '0px',
  backgroundColor: theme.palette.appbar.default
}));

const NavBarContent = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  height: '100%',
  maxWidth: '100%',
  padding: '0px 16px'
}));

const LeftSideAligned = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center'
}));

const RightSideAligned = styled('div')(({ theme }) => ({
  display: 'flex',
  boxAlign: 'center',
  alignItems: 'center',
  flex: '1 1 0%',
  boxPack: 'end',
  justifyContent: 'flex-end'
}));

export default function Navbar() {
  const { isAuthenticated } = useAuth0();
  const Profile = isAuthenticated ? LogoutButton : LoginButton;
  const navigate = useNavigate();

  const handleAboutClick = () => {
    navigate('/about');
  };

  const handleReuVestiaClick = () => {
    navigate('/urrick');
  };

  return (
    <NavBarWrapper>
      <NavBarContent>
        <LeftSideAligned>
          <Button size="medium" onClick={handleAboutClick}>{'About'}</Button>
          <Button size="medium">{'Projects'}</Button>
          <Button size="medium" onClick={handleReuVestiaClick}>{"Reu'Vestia"}</Button>
          <Button size="medium">{'Contact Us'}</Button>
        </LeftSideAligned>
        <RightSideAligned>
          <Profile />
        </RightSideAligned>
      </NavBarContent>
    </NavBarWrapper>
  );
}
