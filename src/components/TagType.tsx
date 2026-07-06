import { Text, View, StyleSheet } from 'react-native';
import {
  COLORS_POKEMON_TYPE,
  PokemonType,
  POKEMON_TYPE_LABELS,
} from '../theme';

type Props = {
  type: PokemonType;
};

export const TagType = ({ type }: Props) => {
  return (
    <View
      style={[
        styles.tag,
        {
          backgroundColor: COLORS_POKEMON_TYPE[type],
        },
      ]}
    >
      <Text style={styles.tagText}>{POKEMON_TYPE_LABELS[type]}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 999,
    alignSelf: 'flex-start',
  },

  tagText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
  },
});
