import React, { useMemo } from 'react';
import {
  Linking,
  Platform,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

export interface WelcomeAction {
  label: string;
  /**
   * Optional short helper text displayed beneath the label.
   */
  caption?: string;
  /**
   * Optional handler invoked when the action is selected.
   */
  onPress?: () => void;
  /**
   * Fallback URL opened if no onPress handler is supplied.
   */
  href?: string;
}

export interface UiProps {
  /** Friendly salutation shown above the title. */
  greeting?: string;
  /** Primary heading for the card. */
  title: string;
  /** Supporting sentence rendered under the title. */
  subtitle?: string;
  /** Optional description paragraph. */
  description?: string;
  /** CTA button label & behaviour. */
  callToAction?: {
    label: string;
    onPress?: () => void;
    href?: string;
  };
  /** Additional resource links rendered as bullets. */
  actions?: WelcomeAction[];
  /** Apply custom container styles. */
  style?: StyleProp<ViewStyle>;
  /** Override title text style. */
  titleStyle?: StyleProp<TextStyle>;
}

const openLink = async (href?: string) => {
  if (!href) return;

  try {
    const supported = await Linking.canOpenURL(href);
    if (supported) {
      await Linking.openURL(href);
    }
  } catch {
    // Silently ignore linking errors – callers can provide a custom handler instead.
  }
};

export function Ui({
  greeting = 'Hello there,',
  title,
  subtitle,
  description,
  callToAction,
  actions = [],
  style,
  titleStyle,
}: UiProps) {
  const hasActions = actions.length > 0;

  const resolvedCallToAction = useMemo(() => {
    if (!callToAction) return undefined;

    return {
      label: callToAction.label,
      onPress: callToAction.onPress ?? (() => openLink(callToAction.href)),
    };
  }, [callToAction]);

  return (
    <View style={[styles.container, style]}>
      <View style={styles.hero}>
        <Text accessibilityRole="text" style={styles.greeting}>
          {greeting}
        </Text>
        <Text accessibilityRole="header" style={[styles.title, titleStyle]}>
          {title}
        </Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        {description ? (
          <Text style={styles.description}>{description}</Text>
        ) : null}
        {resolvedCallToAction ? (
          <Pressable
            accessibilityRole={Platform.OS === 'web' ? 'button' : undefined}
            style={({ pressed }) => [styles.cta, pressed && styles.ctaPressed]}
            onPress={resolvedCallToAction.onPress}
          >
            <Text style={styles.ctaText}>{resolvedCallToAction.label}</Text>
          </Pressable>
        ) : null}
      </View>

      {hasActions ? (
        <View style={styles.panel}>
          <Text style={styles.panelTitle}>Learn & explore</Text>
          {actions.map(({ label, caption, onPress, href }, index) => (
            <Pressable
              key={`${label}-${index}`}
              accessibilityRole={Platform.OS === 'web' ? 'link' : undefined}
              style={({ pressed }) => [
                styles.action,
                pressed && styles.actionPressed,
              ]}
              onPress={onPress ?? (() => openLink(href))}
            >
              <View>
                <Text style={styles.actionLabel}>{label}</Text>
                {caption ? (
                  <Text style={styles.actionCaption}>{caption}</Text>
                ) : null}
              </View>
            </Pressable>
          ))}
        </View>
      ) : null}
    </View>
  );
}

const heroShadow: ViewStyle =
  Platform.select<ViewStyle>({
    web: {
      boxShadow: '0 32px 80px rgba(0, 0, 0, 0.45)',
    } as ViewStyle,
    ios: {
      shadowColor: '#000',
      shadowOpacity: 0.3,
      shadowRadius: 20,
      shadowOffset: { width: 0, height: 12 },
    },
    android: {
      elevation: 6,
      shadowColor: '#000',
      shadowOpacity: 0.2,
      shadowRadius: 12,
      shadowOffset: { width: 0, height: 6 },
    },
    default: {
      shadowColor: '#000',
      shadowOpacity: 0.2,
      shadowRadius: 16,
      shadowOffset: { width: 0, height: 10 },
      elevation: 6,
    },
  }) ?? {};

const styles = StyleSheet.create({
  container: {
    gap: 24,
  },
  hero: {
    borderRadius: 24,
    backgroundColor: '#121212',
    paddingVertical: 32,
    paddingHorizontal: 28,
    gap: 12,
    ...(heroShadow as ViewStyle),
  },
  greeting: {
    color: '#b3b3b3',
    fontSize: 16,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  title: {
    color: '#ffffff',
    fontSize: 36,
    fontWeight: '700',
    letterSpacing: 0.4,
  },
  subtitle: {
    color: '#1ed760',
    fontSize: 20,
    fontWeight: '600',
  },
  description: {
    color: '#e5e5e5',
    fontSize: 16,
    lineHeight: 24,
  },
  cta: {
    marginTop: 8,
    backgroundColor: '#1ed760',
    borderRadius: 999,
    paddingHorizontal: 28,
    paddingVertical: 12,
    alignSelf: 'flex-start',
  },
  ctaPressed: {
    backgroundColor: '#18b44e',
  },
  ctaText: {
    color: '#121212',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.6,
  },
  panel: {
    borderRadius: 24,
    backgroundColor: '#ffffff',
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderWidth: 1,
    borderColor: '#e5e5e5',
    gap: 16,
  },
  panelTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#121212',
  },
  action: {
    paddingVertical: 12,
    borderRadius: 16,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(18, 18, 18, 0.02)',
  },
  actionPressed: {
    backgroundColor: 'rgba(30, 215, 96, 0.15)',
  },
  actionLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#121212',
  },
  actionCaption: {
    marginTop: 4,
    fontSize: 14,
    color: '#6b7280',
  },
});

export default Ui;
