import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import * as ReactDOM from 'react-dom/client';
import { TamaguiProvider, Theme } from 'tamagui';
import App from './app/app';
import './styles.css';
import config from '../../../libs/ui/tamagui.config';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <TamaguiProvider config={config} defaultTheme="spotifyDark">
      <Theme name="spotifyDark">
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Theme>
    </TamaguiProvider>
  </StrictMode>
);
