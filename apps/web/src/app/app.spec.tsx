import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { TamaguiProvider, Theme } from 'tamagui';

import App from './app';
import config from '../../../../libs/ui/tamagui.config';

const renderWithProviders = () =>
  render(
    <TamaguiProvider config={config} defaultTheme="spotifyDark">
      <Theme name="spotifyDark">
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Theme>
    </TamaguiProvider>
  );

describe('App', () => {
  it('should render successfully', () => {
    const { baseElement } = renderWithProviders();
    expect(baseElement).toBeTruthy();
  });

  it('should highlight shared design system messaging', () => {
    const { getByText } = renderWithProviders();

    expect(getByText('One design system, every screen')).toBeTruthy();
  });
});
