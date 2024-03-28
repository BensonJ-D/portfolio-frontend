import React from 'react';
import { Parallax } from 'react-parallax';

const background =
  'https://images.unsplash.com/photo-1517021897933-0e0319cfbc28?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;w=1000&amp;q=80';

const Container = ({ children }: {children: JSX.Element | JSX.Element[]}) => (
  <Parallax bgImage={background} strength={1000}>
    {children}
  </Parallax>
);

export default Container;
