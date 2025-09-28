import { YStack } from 'tamagui';
import { Ui } from 'ui';

const resources = [
  {
    label: 'Design checklist',
    caption: 'Align mobile and web experiences',
    href: 'https://spotify.design/teachers-pet',
  },
  {
    label: 'Nx component sharing',
    caption: 'Patterns for multi-platform libs',
    href: 'https://nx.dev/concepts/integrated-repos',
  },
  {
    label: 'Accessibility tuning',
    caption: 'Ensure keyboard and screen-reader support',
    href: 'https://www.a11yproject.com/checklist/',
  },
];

export function App() {
  return (
    <YStack f={1} ai="center" jc="center" px="$5" py="$7" w="100%">
      <YStack w="100%" maxWidth={960} gap="$6">
        <Ui
          greeting="Continue building"
          title="One design system, every screen"
          subtitle="Shared UI components delivered through Nx"
          description="Connect your React and React Native clients to the same UI kit. Compose once, consume everywhere, and keep your Spotify clone consistent across devices."
          callToAction={{
            label: 'View shared library',
            href: 'https://nx.dev/recipes/react/react-native#sharing-code',
          }}
          actions={resources}
        />
      </YStack>
    </YStack>
  );
}

export default App;
