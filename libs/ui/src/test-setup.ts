import { join } from 'path';

const tamaguiConfigPath = join(process.cwd(), 'libs/ui/tamagui.config.ts');

process.env.TAMAGUI_CONFIG = process.env.TAMAGUI_CONFIG ?? tamaguiConfigPath;
process.env.TAMAGUI_TARGET = process.env.TAMAGUI_TARGET ?? 'native';
process.env.TAMAGUI_DISABLE_WARNINGS = '1';
process.env.TAMAGUI_IS_TEST = '1';
