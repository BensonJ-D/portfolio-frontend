import { styled } from '@mui/material';

export const ContentWrapper = styled('div')(({ noNav }: { noNav?: boolean}) => ({
  paddingLeft: '10px',
  paddingRight: '10px',
  paddingTop: noNav ? '20px' : '53px',
  paddingBottom: '20px',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column'
}));
