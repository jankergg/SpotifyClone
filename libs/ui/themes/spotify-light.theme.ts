import { config as baseConfig } from '@tamagui/config/v2';

export const spotifyLightTheme = {
  ...baseConfig.themes.light,
  background: '#f9fafb',
  backgroundHover: '#f3f4f6',
  backgroundFocus: '#e5e7eb',
  color: '#111827',
  colorHover: '#111827',
  accent: '#1db954',
  accentHover: '#1ed760',
  accentFocus: '#1aa34a',
} as const;
