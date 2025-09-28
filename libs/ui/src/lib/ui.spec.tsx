import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { TamaguiProvider } from 'tamagui';

import config from '../../tamagui.config';
import Ui from './ui';

afterEach(() => {
  jest.restoreAllMocks();
});

describe('Ui', () => {
  const renderWithProvider = (ui: React.ReactElement) =>
    render(
      <TamaguiProvider config={config} defaultTheme="spotifyDark">
        {ui}
      </TamaguiProvider>
    );

  it('renders the provided content', () => {
    const { getByText } = renderWithProvider(
      <Ui
        greeting="hi"
        title="Discover mixes"
        subtitle="Fresh drops"
        description="Play curated playlists tailored to your listening mood."
        actions={[{ label: 'Learn more', caption: 'Docs' }]}
      />
    );

    expect(getByText('hi')).toBeTruthy();
    expect(getByText('Discover mixes')).toBeTruthy();
    expect(getByText('Fresh drops')).toBeTruthy();
    expect(
      getByText('Play curated playlists tailored to your listening mood.')
    ).toBeTruthy();
    expect(getByText('Learn more')).toBeTruthy();
    expect(getByText('Docs')).toBeTruthy();
  });

  it('falls back to href when no click handler is provided', () => {
    const linking = require('react-native').Linking;
    const canOpenURLSpy = jest
      .spyOn(linking, 'canOpenURL')
      .mockResolvedValue(true);
    const openURLSpy = jest
      .spyOn(linking, 'openURL')
      .mockResolvedValue(undefined);

    const { getByText } = renderWithProvider(
      <Ui
        title="Discover mixes"
        callToAction={{ label: 'Open mixes', href: 'https://example.com' }}
      />
    );

    fireEvent.press(getByText('Open mixes'));

    return waitFor(() => {
      expect(openURLSpy).toHaveBeenCalledWith('https://example.com');
    });
  });
});
