import { CssBaseline } from '@mui/material';
import Parallax from './Parallax';
import Navbar from './navbar/Navbar';
import { ContentWrapper } from './ContentWrapper';
import { Route, Routes, redirect  } from 'react-router-dom';
import React from 'react';
import AboutPage from './about/AboutPage';
import ContentPage from './about/ContentPage';

function RedirectToHome(){
  redirect("/")
  return <div />
}

export const Content = () => {
  return (
    <>
      <CssBaseline/>
      <Parallax>
        <Navbar />
        <ContentWrapper>
          <Routes>
            <Route path="/about" element={<AboutPage />} />
            <Route path="/:page" element={<ContentPage />} />
            <Route path="/callback" element={<RedirectToHome />} />
          </Routes>
        </ContentWrapper>
      </Parallax>
    </>
  );
};
