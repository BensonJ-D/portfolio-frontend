import React, { useState } from 'react';
import { styled } from '@mui/material';

const background =
  'https://images.unsplash.com/photo-1517021897933-0e0319cfbc28?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;w=1000&amp;q=80';

const Parallax = styled('div')(({ yOffset }: {yOffset: number}) => ({
  backgroundImage: `url("${background}")`,
  backgroundAttachment: 'fixed',
  backgroundSize: `${window.screen.availWidth}px`,
  backgroundPositionY: `${yOffset}px`,

  /* you are free to lay out the container items with flexbox or whatever means you wish */
  minHeight: '100vh',

  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  scrollbarGutter: 'stable both-edges'
}));

const Container = ({ children }: {children: JSX.Element | JSX.Element[]}) => {
  const [yOffset, setYOffset] = useState(0);

  window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;
    const rate = 30;
    setYOffset(-scrollPosition / rate);
  });

  return (
    <Parallax yOffset={yOffset}>
      {children}
    </Parallax>
  );
};

export default Container;
