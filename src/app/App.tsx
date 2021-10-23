import React from 'react';
import About from '../components/about/About';
import { CssBaseline, ThemeProvider } from '@mui/material';
import Theme from '../themes';

const App = () => {
  // const [light, setLight] = React.useState(true);
  return (
      <ThemeProvider theme={Theme.Default}>
          <CssBaseline />
          <About />
      </ThemeProvider>
  );
};

export default App;
