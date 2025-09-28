import { join } from 'path';

const tamaguiConfigPath = join(process.cwd(), 'libs/ui/tamagui.config.ts');

process.env.TAMAGUI_CONFIG = process.env.TAMAGUI_CONFIG ?? tamaguiConfigPath;
process.env.TAMAGUI_TARGET = process.env.TAMAGUI_TARGET || 'web';
process.env.TAMAGUI_DISABLE_WARNINGS = '1';
process.env.TAMAGUI_IS_TEST = '1';

if (typeof window !== 'undefined' && !window.matchMedia) {
  window.matchMedia = (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => undefined,
    removeListener: () => undefined,
    addEventListener: () => undefined,
    removeEventListener: () => undefined,
    dispatchEvent: () => false,
  });
}
