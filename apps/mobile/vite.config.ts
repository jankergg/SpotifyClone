import { join } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import * as esbuild from 'esbuild';
import { readFileSync } from 'fs';

const extensions = [
  '.mjs',
  '.web.tsx',
  '.tsx',
  '.web.ts',
  '.ts',
  '.web.jsx',
  '.jsx',
  '.web.js',
  '.js',
  '.css',
  '.json',
];

const rollupPlugin = (matchers: RegExp[]) => ({
  name: 'js-in-jsx',
  load(id: string) {
    if (matchers.some((matcher) => matcher.test(id)) && id.endsWith('.js')) {
      const file = readFileSync(id, { encoding: 'utf-8' });
      return esbuild.transformSync(file, { loader: 'jsx', jsx: 'automatic' });
    }
  },
});

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
    cacheDir: '../../node_modules/.vite/apps/mobile',
    define: {
      global: 'window',
      'process.env.TAMAGUI_TARGET': JSON.stringify(
        process.env.TAMAGUI_TARGET ?? 'web'
      ),
    },
    resolve: {
      extensions,
      alias: {
        'react-native': 'react-native-web',
        'react-native-svg': 'react-native-svg-web',
        '@react-native/assets-registry/registry':
          'react-native-web/dist/modules/AssetRegistry/index',
      },
    },
    build: {
      reportCompressedSize: true,
      commonjsOptions: { transformMixedEsModules: true },
      outDir: '../../dist/apps/mobile/web',
      rollupOptions: {
        plugins: [rollupPlugin([/react-native-vector-icons/])],
      },
    },
    server: {
      port: 4200,
      host: 'localhost',
      fs: {
        // Allow serving files from one level up to the project root
        allow: ['..'],
      },
    },
    preview: {
      port: 4300,
      host: 'localhost',
    },
    optimizeDeps: {
      esbuildOptions: {
        resolveExtensions: extensions,
        jsx: 'automatic',
        loader: { '.js': 'jsx' },
      },
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
    ],
    // Uncomment this if you are using workers.
    // worker: {
    //  plugins: [ nxViteTsPaths() ],
    // },
  };
});
