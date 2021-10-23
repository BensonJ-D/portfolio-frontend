import React from 'react';
import { Button, styled } from '@mui/material';
import useAbout from '../../api/useAbout';

const AboutContainer = styled('div')(({ theme }) => ({
  color: theme.palette.primary.main,
  backgroundColor: theme.palette.primary.main,
  paddingLeft: '10px',
  paddingRight: '10px',
  paddingTop: '20px',
  paddingBottom: '20px',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'row'
}));

const AboutBody = styled('div')(({ theme }) => ({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  width: '50%',
  textAlign: 'left',
  paddingRight: theme.spacing(2),
  alignItems: 'left'
}));

const AboutHeader = styled('h1')(({ theme }) => ({
  fontSize: '1.875rem',
  lineHeight: '2.25rem',
  marginBottom: '4px',
  color: '#ffffff',
  fontWeight: 500
}));

const AboutSubheader = styled('p')(({ theme }) => ({
  lineHeight: '1.625rem',
  color: '#ffffff'
}));

const LineBreak = styled('br')(({ theme }) => ({
  display: 'inline-block',
  hidden: true
}));

const CenterJustifiedFlexBox = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center'
}));

const ImageContainer = styled('div')(({ theme }) => ({
  maxWidth: '32rem',
  width: '50%'
}));

const Image = styled('img')(({ theme }) => ({
  objectFit: 'cover',
  objectPosition: 'center',
  rounded: true
}));

export default function About() {
  // const theme = useTheme();
  const { details } = useAbout();

  return (
    <section>
      <AboutContainer>
        <AboutBody>
          <AboutHeader>
            Hi, I&apos;m James.
            <LineBreak />Here&apos;s some random content.
          </AboutHeader>
          <AboutSubheader>
            <div>
              { details.content }
            </div>
            <div>
              Last updated: { details.timestamp.fromNow() }
            </div>
          </AboutSubheader>
          <CenterJustifiedFlexBox>
            <Button color='secondary'>
              Work with me
            </Button>
            <Button color='secondary'>
              See my past work
            </Button>
          </CenterJustifiedFlexBox>
        </AboutBody>
        <ImageContainer>
          <Image
            className="object-cover object-center rounded"
            alt="hero"
            src="./sample-image.svg"
          />
        </ImageContainer>
      </AboutContainer>
    </section>
  );
}
