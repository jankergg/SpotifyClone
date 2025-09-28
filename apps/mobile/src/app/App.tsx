import React from 'react';
import { ScrollView, StatusBar } from 'react-native';
import { TamaguiProvider, Theme, YStack } from 'tamagui';
import { Ui } from 'ui';
import config from '../../../../libs/ui/tamagui.config';

export const App = () => {
  return (
    <TamaguiProvider config={config} defaultTheme="spotifyDark">
      <Theme name="spotifyDark">
        <StatusBar barStyle="light-content" backgroundColor="#050505" />
        <YStack f={1} bg="$background">
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ flexGrow: 1 }}
          >
            <YStack
              f={1}
              gap="$6"
              px="$5"
              py="$6"
              mx="auto"
              maxWidth={800}
              width="100%"
            >
              <Ui
                greeting="Your daily mix"
                title="Playlists that travel with you"
                subtitle="Spotify clone, powered by Nx"
                description="Build once, share everywhere. Use the shared UI library to keep mobile and web perfectly in sync."
                callToAction={{
                  label: 'Browse docs',
                  href: 'https://nx.dev/getting-started/intro?utm_source=nx-project',
                }}
                actions={[
                  {
                    label: 'React Native + Nx',
                    caption: 'Recipes, bundlers & native tips',
                    href: 'https://nx.dev/recipes/react/react-native',
                  },
                  {
                    label: 'Component guidelines',
                    caption: 'Create platform-ready UI building blocks',
                    href: 'https://reactnative.dev/docs/components-and-apis',
                  },
                  {
                    label: 'Design tokens',
                    caption: 'Keep themes consistent across platforms',
                    href: 'https://m3.material.io/foundations/design-tokens/overview',
                  },
                ]}
              />
            </YStack>
          </ScrollView>
        </YStack>
      </Theme>
    </TamaguiProvider>
  );
};

export default App;
