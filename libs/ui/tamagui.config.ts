import { config as baseConfig } from '@tamagui/config/v2';
import { createTamagui } from 'tamagui';
import { shorthands } from '@tamagui/shorthands';

const spotifyDark = {
  ...baseConfig.themes.dark,
  background: '#050505',
  backgroundFocus: '#121212',
  backgroundHover: '#18181b',
  color: '#f4f4f5',
  colorHover: '#ffffff',
  accent: '#1ed760',
  accentFocus: '#19c95c',
  accentHover: '#23e06b',
};

const spotifyLight = {
  ...baseConfig.themes.light,
  background: '#f9fafb',
  backgroundHover: '#f3f4f6',
  backgroundFocus: '#e5e7eb',
  color: '#111827',
  colorHover: '#111827',
  accent: '#1db954',
  accentHover: '#1ed760',
  accentFocus: '#1aa34a',
};

const config = createTamagui({
  ...baseConfig,
  shorthands,
  defaultTheme: 'spotifyDark',
  themes: {
    ...baseConfig.themes,
    spotifyDark,
    spotifyLight,
  },
});

export type AppConfig = typeof config;

declare module 'tamagui' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface TamaguiCustomConfig extends AppConfig {}
}

export default config;
