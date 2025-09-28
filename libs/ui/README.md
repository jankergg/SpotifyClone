# UI library

Shared Tamagui-driven UI primitives for the Spotify clone experience. Components leverage Tamagui's cross-platform stack so they render consistently inside both the React Native runtime and React DOM (via `react-native-web`).

## Usage

Import components directly from the package alias:

```tsx
import { Ui } from 'ui';

export function HomeScreen() {
  return (
    <Ui
      greeting="Your daily mix"
      title="Playlists that travel with you"
      callToAction={{ label: 'Browse docs', href: 'https://nx.dev' }}
      actions={[
        {
          label: 'Component guidelines',
          caption: 'React Native best practices',
        },
      ]}
    />
  );
}
```

> Wrap your application tree with `TamaguiProvider` (see `apps/mobile/src/app/App.tsx` or `apps/web/src/main.tsx`) so the component receives the shared theme configuration.

### Web integration

- Vite uses the Tamagui Vite plugin (`apps/web/vite.config.ts`) to extract styles and feed the design tokens to the bundler.
- Jest is configured (`apps/web/jest.config.ts`) to transform Tamagui packages, inject the config, and set `TAMAGUI_TARGET=web` during tests.

### Mobile integration

Use the component inside React Native screens. Tamagui theme tokens are provided by `TamaguiProvider` in `apps/mobile/src/app/App.tsx`, and linking actions fall back to `Linking.openURL` when only an `href` is provided.

## Running unit tests

Run `nx test ui` to execute the unit tests via [Jest](https://jestjs.io).

## Next steps

- Extract typography tokens into a dedicated theme module for easier reuse.
- Add Storybook stories (Nx `@nx/react-native:component-story`) to preview components across platforms.
- Create additional shared primitives (buttons, track cards, etc.) that wrap the same design system.
