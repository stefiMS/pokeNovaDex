import { View, Text, StyleSheet } from 'react-native';
import {
  COLORS_POKEMON_TYPE,
  PokemonType,
  POKEMON_TYPE_LABELS,
  COLORS,
} from '../theme';
import { POKEMON_TYPE_EMOJIS } from '../constants/components';

type Props = {
  type: PokemonType;
};

export const PokemonTypeBadge = ({ type }: Props) => {
  return (
    <View
      style={[styles.container, { backgroundColor: COLORS_POKEMON_TYPE[type] }]}
    >
      <Text style={styles.emoji}>{POKEMON_TYPE_EMOJIS[type]}</Text>

      <Text style={styles.label}>{POKEMON_TYPE_LABELS[type]}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 6,
  },
  emoji: {
    fontSize: 16,
  },
  label: {
    color: COLORS.surface,
    fontWeight: '700',
    fontSize: 12,
  },
});
