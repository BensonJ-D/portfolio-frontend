import { styled, Theme } from '@mui/material';

export const ContentContainer = styled('div')(() => ({
  maxWidth: '1000px',
  // minHeight: '50vh',
  paddingLeft: '20px',
  paddingRight: '20px',
  paddingTop: '20px',
  paddingBottom: '20px',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  backgroundImage: 'url("/parchment.jpg")',
  backgroundColor: 'white'
}));

export const ContentBody = styled('div')(({ theme, columns }: { theme: Theme, columns?: number }) => ({
  flexDirection: 'column',
  width: '100%',
  textAlign: 'left',
  alignItems: 'left',
  columnCount: columns || 1,
  columnGap: !columns ? '0px' : '20px',
  // fontSize: '1.875rem',
  // lineHeight: '2.25rem',
  fontWeight: 500
}));

export const ContentHeader = styled('div')(() => ({
  width: '100%',
  marginBottom: '4px'
}));

export const ContentFooter = styled('div')(() => ({
  width: '100%',
  flexDirection: 'row',
  textAlign: 'right',
  alignItems: 'right'
}));
