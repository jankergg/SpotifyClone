import type { Config } from 'jest';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const localDir = dirname(fileURLToPath(import.meta.url));

const config: Config = {
  displayName: 'web',
  preset: '../../jest.preset.js',
  transform: {
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nx/react/plugins/jest',
    '^.+\\.[tj]sx?$': [
      'babel-jest',
      {
        configFile: join(localDir, 'babel.config.js'),
      },
    ],
  },
  moduleNameMapper: {
    '^react-native$': 'react-native-web',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/apps/web',
  transformIgnorePatterns: [
    'node_modules/(?!(@tamagui|tamagui|react-native|react-native-vector-icons|@react-native|expo-linear-gradient)/)',
  ],
  setupFiles: [join(localDir, 'jest.setup.ts')],
};

export default config;
