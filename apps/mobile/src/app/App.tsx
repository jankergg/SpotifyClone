import React from 'react';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet } from 'react-native';
import { Ui } from 'ui';

export const App = () => {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
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
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#050505',
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
});

export default App;
