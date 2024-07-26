import React from 'react';
import { ThemeProvider } from '@mui/material';
import Theme from '../themes';
import { QueryClient, QueryClientProvider } from 'react-query';
import { WebSocketProvider } from '../utils/websockets/WebSocketProvider';
import { Auth0Provider } from '../providers/Auth0Provider';
import { BrowserRouter } from 'react-router-dom';
import { Content } from '../components/Content';

const App = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Auth0Provider>
          {/* <WebSocketProvider> */}
            <ThemeProvider theme={Theme.Light}>
              <Content />
            </ThemeProvider>
          {/* </WebSocketProvider> */}
        </Auth0Provider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
