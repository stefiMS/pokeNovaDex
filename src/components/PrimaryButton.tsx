import { ReactNode } from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { COLORS } from '../theme';
import type { DimensionValue } from 'react-native';

type Props = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: 'primary' | 'outline';
  icon?: ReactNode;
  width?: DimensionValue;
};

export const PrimaryButton = ({
  title,
  onPress,
  disabled,
  loading,
  variant = 'primary',
  icon,
  width = '100%',
}: Props) => {
  const isOutline = variant === 'outline';

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.button,
        { width },
        isOutline ? styles.outline : styles.primary,
        disabled && styles.disabled,
        pressed && styles.pressed,
      ]}
    >
      {loading ? (
        <ActivityIndicator
          color={isOutline ? COLORS.interactive : COLORS.surface}
        />
      ) : (
        <View style={styles.content}>
          {icon}
          <Text style={[styles.text, isOutline && styles.outlineText]}>
            {title}
          </Text>
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },

  primary: {
    backgroundColor: COLORS.interactive,
  },

  outline: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.interactive,
  },

  disabled: {
    opacity: 0.5,
  },

  pressed: {
    opacity: 0.8,
  },

  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  text: {
    color: COLORS.surface,
    fontSize: 18,
    fontWeight: '600',
  },

  outlineText: {
    color: COLORS.interactive,
  },
});
