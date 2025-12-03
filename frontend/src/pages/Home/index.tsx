import React from "react";

import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';

import Footer from '../../components/Common/Footer';
import AppTheme from '../../components/Common/Theme/AppTheme';
import AppAppBar from '../../components/AppBar';
import MainContent from './MainContent';
import Latest from '../../components/Latest';

type HomeProps = {
    disableCustomTheme: Boolean;
}

export default function Home(props: HomeProps) {
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />

      <AppAppBar />
      <Container
        maxWidth="lg"
        component="main"
        sx={{ display: 'flex', flexDirection: 'column', my: 16, gap: 4 }}
      >
        <MainContent />
        <Latest />
      </Container>
      <Footer />
    </AppTheme>
  );
}