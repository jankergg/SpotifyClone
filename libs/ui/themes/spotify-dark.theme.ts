import { config as baseConfig } from '@tamagui/config/v2';

export const spotifyDarkTheme = {
  ...baseConfig.themes.dark,
  background: '#050505',
  backgroundFocus: '#121212',
  backgroundHover: '#18181b',
  color: '#f4f4f5',
  colorHover: '#ffffff',
  accent: '#1ed760',
  accentFocus: '#19c95c',
  accentHover: '#23e06b',
} as const;
