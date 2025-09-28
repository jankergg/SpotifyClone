# UI library

Shared React Native UI primitives for the Spotify clone experience. Components are authored with React Native primitives so they can render inside both the Expo/React Native runtime and the React DOM runtime (via `react-native-web`).

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

### Web integration

- Vite is configured (`apps/web/vite.config.ts`) to alias `react-native` to `react-native-web`.
- Jest is configured (`apps/web/jest.config.ts`) with the same alias so tests run against the web renderer.

### Mobile integration

Use the component inside React Native screens. Linking actions fall back to `Linking.openURL` when only an `href` is provided.

## Running unit tests

Run `nx test ui` to execute the unit tests via [Jest](https://jestjs.io).

## Next steps

- Extract typography tokens into a dedicated theme module for easier reuse.
- Add Storybook stories (Nx `@nx/react-native:component-story`) to preview components across platforms.
- Create additional shared primitives (buttons, track cards, etc.) that wrap the same design system.
