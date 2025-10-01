import React, { useMemo } from 'react';
import {
  Linking,
  Platform,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';
import { Button, Paragraph, Text, Theme, YStack, styled } from 'tamagui';

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

const Container = styled(YStack, {
  name: 'WelcomeContainer',
  gap: '$6',
  width: '100%',
  maxWidth: 560,
});

const HeroCard = styled(YStack, {
  name: 'WelcomeHero',
  gap: '$3',
  px: '$6',
  py: '$7',
  borderRadius: '$8',
  backgroundColor: '$backgroundFocus',
  shadowColor: 'rgba(0,0,0,0.35)',
  shadowOpacity: 1,
  shadowRadius: 32,
  shadowOffset: { width: 0, height: 20 },
  elevation: 10,
});

const GreetingText = styled(Text, {
  name: 'WelcomeGreeting',
  fontSize: '$3',
  letterSpacing: 1,
  textTransform: 'uppercase',
  color: '$color',
  opacity: 0.7,
});

const TitleText = styled(Text, {
  name: 'WelcomeTitle',
  fontSize: '$9',
  fontWeight: '700',
  lineHeight: '$11',
  letterSpacing: 0.5,
  color: '$color',
});

const SubtitleText = styled(Text, {
  name: 'WelcomeSubtitle',
  fontSize: '$6',
  fontWeight: '600',
  color: '$accent',
});

const DescriptionText = styled(Paragraph, {
  name: 'WelcomeDescription',
  size: '$4',
  color: '$color',
  opacity: 0.85,
  lineHeight: '$5',
});

const ActionsPanel = styled(YStack, {
  name: 'WelcomeActionsPanel',
  gap: '$4',
  px: '$5',
  py: '$5',
  borderRadius: '$7',
  borderWidth: 1,
  borderColor: '$color6',
  backgroundColor: '$background',
});

const PanelHeader = styled(Text, {
  name: 'WelcomeActionsTitle',
  fontSize: '$5',
  fontWeight: '700',
  color: '$color',
});

const ActionsStack = styled(YStack, {
  name: 'WelcomeActionsStack',
  gap: '$3',
});

const ActionButton = styled(Button, {
  name: 'WelcomeActionButton',
  unstyled: true,
  w: '100%',
  px: '$4',
  py: '$3',
  borderRadius: '$6',
  backgroundColor: '$backgroundLight',
  alignItems: 'flex-start',
  hoverStyle: {
    backgroundColor: '$backgroundFocus',
  },
  pressStyle: {
    backgroundColor: '$accentHover',
  },
  focusVisibleStyle: {
    outlineWidth: 2,
    outlineColor: '$accent',
    outlineStyle: 'solid',
  },
});

const ActionLabel = styled(Text, {
  name: 'WelcomeActionLabel',
  fontSize: '$4',
  fontWeight: '600',
  color: '$color',
});

const ActionCaption = styled(Paragraph, {
  name: 'WelcomeActionCaption',
  size: '$3',
  color: '$color',
  opacity: 0.7,
  mt: '$1',
});

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
    <Theme name="spotifyLight">
      <Container style={style}>
        <HeroCard>
          <GreetingText role="note">{greeting}</GreetingText>
          <TitleText role="heading" style={titleStyle}>
            {title}
          </TitleText>
          {subtitle ? <SubtitleText>{subtitle}</SubtitleText> : null}
          {description ? (
            <DescriptionText>{description}</DescriptionText>
          ) : null}
          {resolvedCallToAction ? (
            <Button
              size="$4"
              borderRadius="$10"
              alignSelf="flex-start"
              borderColor="$accentHover"
              color="$color"
              hoverStyle={{
                backgroundColor: '$accentHover',
                borderColor: '$color',
              }}
              pressStyle={{ backgroundColor: '$accentFocus' }}
              role={Platform.OS === 'web' ? 'button' : undefined}
              onPress={resolvedCallToAction.onPress}
            >
              {resolvedCallToAction.label}
            </Button>
          ) : null}
        </HeroCard>

        {hasActions ? (
          <Theme name="spotifyLight">
            <ActionsPanel>
              <PanelHeader>Learn & explore</PanelHeader>
              <ActionsStack>
                {actions.map(({ label, caption, onPress, href }, index) => (
                  <ActionButton
                    key={`${label}-${index}`}
                    onPress={onPress ?? (() => openLink(href))}
                    accessibilityRole={
                      Platform.OS === 'web' ? 'link' : undefined
                    }
                  >
                    <YStack gap="$1">
                      <ActionLabel>{label}</ActionLabel>
                      {caption ? (
                        <ActionCaption>{caption}</ActionCaption>
                      ) : null}
                    </YStack>
                  </ActionButton>
                ))}
              </ActionsStack>
            </ActionsPanel>
          </Theme>
        ) : null}
      </Container>
    </Theme>
  );
}

export default Ui;
