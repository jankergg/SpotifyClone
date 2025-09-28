const path = require('path');

module.exports = function (api) {
  api.cache(true);

  const inlineEnvPlugin = require.resolve(
    '../../tools/babel/inline-tamagui-target'
  );
  const uiPackagePath = path.join(__dirname, 'src/index.ts');

  return {
    presets: [
      [
        '@nx/react/babel',
        {
          runtime: 'automatic',
          useBuiltIns: 'usage',
        },
      ],
    ],
    plugins: [
      [inlineEnvPlugin],
      [
        '@tamagui/babel-plugin',
        {
          config: './tamagui.config.ts',
          components: ['tamagui', uiPackagePath],
          logTimings: process.env.NODE_ENV === 'development',
        },
      ],
    ],
    env: {
      test: {
        presets: [
          ['module:@react-native/babel-preset', { useTransformReactJSX: true }],
        ],
      },
    },
  };
};
