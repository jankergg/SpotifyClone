import { config as baseConfig } from '@tamagui/config/v2';
import { createTamagui } from 'tamagui';
import { shorthands } from '@tamagui/shorthands';

import { spotifyDarkTheme } from './themes/spotify-dark.theme';
import { spotifyLightTheme } from './themes/spotify-light.theme';

const config = createTamagui({
  ...baseConfig,
  shorthands,
  defaultTheme: 'spotifyDark',
  themes: {
    ...baseConfig.themes,
    spotifyDark: spotifyDarkTheme,
    spotifyLight: spotifyLightTheme,
  },
});

export type AppConfig = typeof config;

declare module 'tamagui' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface TamaguiCustomConfig extends AppConfig {}
}

export default config;
