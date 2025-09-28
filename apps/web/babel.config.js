const path = require('path');

module.exports = function (api) {
  api.cache(true);

  const inlineEnvPlugin = require.resolve(
    '../../tools/babel/inline-tamagui-target'
  );
  const uiPackagePath = path.join(__dirname, '../../libs/ui/src/index.ts');

  return {
    presets: [
      [
        '@nx/react/babel',
        {
          runtime: 'automatic',
        },
      ],
    ],
    plugins: [
      [inlineEnvPlugin],
      [
        '@tamagui/babel-plugin',
        {
          config: '../../libs/ui/tamagui.config.ts',
          components: ['tamagui', uiPackagePath],
          logTimings: process.env.NODE_ENV === 'development',
        },
      ],
    ],
  };
};
