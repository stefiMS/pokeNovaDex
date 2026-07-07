import { View, Text, StyleSheet, Image } from 'react-native';
import { COLORS } from '../theme';

type CardPokemonProps = {
  imageUrl?: string;
  name: string;
  id: number;
};

export const CardPokemon = ({ imageUrl, name, id }: CardPokemonProps) => {
  return (
    <View style={styles.card}>
      <View style={styles.column1}>
        <Image source={{ uri: imageUrl }} style={{ width: 100, height: 100 }} />
      </View>
      <View style={styles.column2}>
        <Text style={styles.pokemonId}># {id}</Text>
        <Text style={styles.namePokemon}>{name}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: `${COLORS.border}`,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  column1: {
    flex: 1,
  },
  column2: {
    flex: 2,
    flexDirection: 'column',
    gap: 4,
    justifyContent: 'center',
  },
  column3: {
    alignSelf: 'center',
  },
  sectionTypes: {
    flexDirection: 'row',
    gap: 4,
  },
  namePokemon: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  pokemonId: {
    color: `${COLORS.gray100}`,
    fontSize: 14,
    fontWeight: '600',
    backgroundColor: `${COLORS.tagIdPokemon}`,
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
});
