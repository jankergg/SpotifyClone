/// <reference types='vitest' />
import { join } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';

const tamaguiConfigFile = join(__dirname, '../../libs/ui/tamagui.config.ts');
const inlineEnvPlugin = join(
  __dirname,
  '../../tools/babel/inline-tamagui-target.js'
);
const uiPackagePath = join(__dirname, '../../libs/ui/src/index.ts');

export default defineConfig(async () => {
  const { tamaguiExtractPlugin, tamaguiPlugin } = await import(
    '@tamagui/vite-plugin'
  );

  return {
    root: __dirname,
    cacheDir: '../../node_modules/.vite/apps/web',
    define: {
      'process.env.TAMAGUI_TARGET': JSON.stringify(
        process.env.TAMAGUI_TARGET ?? 'web'
      ),
    },
    server: {
      port: 4200,
      host: 'localhost',
    },
    preview: {
      port: 4200,
      host: 'localhost',
    },
    plugins: [
      tamaguiPlugin({
        config: tamaguiConfigFile,
        components: ['tamagui', uiPackagePath],
      }),
      tamaguiExtractPlugin({
        config: tamaguiConfigFile,
      }),
      react({
        babel: {
          plugins: [
            [inlineEnvPlugin],
            [
              '@tamagui/babel-plugin',
              {
                config: tamaguiConfigFile,
                components: ['tamagui', uiPackagePath],
                logTimings: process.env.NODE_ENV === 'development',
              },
            ],
          ],
        },
      }),
      nxViteTsPaths(),
      nxCopyAssetsPlugin(['*.md']),
    ],
    resolve: {
      alias: {
        'react-native': 'react-native-web',
      },
    },
    // Uncomment this if you are using workers.
    // worker: {
    //  plugins: [ nxViteTsPaths() ],
    // },
    build: {
      outDir: '../../dist/apps/web',
      emptyOutDir: true,
      reportCompressedSize: true,
      commonjsOptions: {
        transformMixedEsModules: true,
      },
    },
  };
});
