import { Ionicons } from '@expo/vector-icons';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { COLORS } from '../theme/colors';
import { useNavigation, useRoute } from '@react-navigation/native';
import { PokemonStatBar } from '../components/PokemonStatBar';
import { useGetDetailPokemon } from '../hooks';
import { PokemonStat } from '../types';
import { TagType } from '../components';
import { PokemonType } from '../theme';

export const PokemonDetailScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const { pokemonId } = route.params as {
    pokemonId: number;
  };

  const { data, isLoading, isError } = useGetDetailPokemon(pokemonId);
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`;

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (isError || !data) {
    return <Text>Error al cargar el Pokémon</Text>;
  }

  return (
    <ScrollView
      style={styles.containerDetail}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.containerHeader}>
        <View style={styles.headerBackButton}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons
              name="arrow-back"
              size={24}
              color="white"
              style={styles.arrowBack}
            />
          </TouchableOpacity>
        </View>

        <Image source={{ uri: imageUrl }} style={styles.pokemonImage} />
      </View>
      <View style={styles.containerDescription}>
        <Text style={styles.pokeId}># {data.id}</Text>

        <Text style={styles.namePoke}>{data.name.toUpperCase()}</Text>

        <View style={styles.types}>
          {data.types.map((item) => (
            <TagType
              key={item.type.name}
              type={item.type.name as PokemonType}
            />
          ))}
        </View>
        <View style={styles.statistics}>
          <Text style={styles.statisticsTitle}>Estadísticas</Text>
          {data.stats.map((stat: PokemonStat) => (
            <PokemonStatBar
              key={stat.stat.name}
              label={stat.stat.name}
              value={stat.base_stat}
            />
          ))}
        </View>

        <View style={styles.sectionMeasure}>
          <View style={styles.measureItem}>
            <Text style={styles.measureLabel}>Height</Text>
            <Text style={styles.measureValue}>{data.height / 10} m</Text>
          </View>
          <View style={styles.lineSeparator} />
          <View style={styles.measureItem}>
            <Text style={styles.measureLabel}>Weight</Text>
            <Text style={styles.measureValue}>{data.weight / 10} kg</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
  },

  headerBackButton: {
    marginBottom: 20,
  },
  arrowBack: {
    alignItems: 'flex-start',
    width: '100%',
    justifyContent: 'flex-start',
    top: 16,
    padding: 8,
    backgroundColor: `${COLORS.gray700}`,
    borderRadius: 20,
  },
  pokemonImage: {
    width: 250,
    height: 250,
    alignSelf: 'center',
  },
  pokeId: {
    color: `${COLORS.gray100}`,
    fontSize: 14,
    fontWeight: '600',
    backgroundColor: `${COLORS.tagIdPokemon}`,
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  namePoke: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.gray900,
    marginBottom: 8,
  },

  containerDetail: {
    flex: 1,
    backgroundColor: COLORS.backgroundDetail,
  },

  containerHeader: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 24,
  },

  containerDescription: {
    width: '100%',
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 40,
    backgroundColor: COLORS.background,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    gap: 8,
  },

  types: {
    flexDirection: 'row',
    gap: 8,
  },
  sectionSize: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 16,
    justifyContent: 'space-between',
    width: '100%',
  },
  statistics: {
    width: '100%',
    gap: 8,
  },
  statisticsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  sectionMeasure: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
    marginTop: 24,
    paddingVertical: 16,
    backgroundColor: COLORS.gray100,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.gray700,
  },

  measureItem: {
    alignItems: 'center',
  },

  measureLabel: {
    fontSize: 14,
    color: COLORS.gray600,
  },

  measureValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.gray900,
  },
  lineSeparator: {
    width: 1,
    height: '100%',
    backgroundColor: COLORS.gray800,
  },
});
