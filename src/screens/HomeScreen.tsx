import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Text,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getPokemonId } from '../utils';
import { COLORS } from '../theme';
import { CardPokemon } from '../components';
import { useCallback, useMemo } from 'react';
import { usePokemonInfinite } from '../hooks';
import { HomeStackParamList, PokemonItem } from '../types';
import { ErrorScreen } from './ErrorScreen';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type HomeNavigationProp = NativeStackNavigationProp<HomeStackParamList>;

export const HomeScreen = () => {
  const {
    data,
    isLoading,
    isError,
    error,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    refetch,
  } = usePokemonInfinite();
  const navigation = useNavigation<HomeNavigationProp>();

  const allPokemons = useMemo(() => {
    return (
      data?.pages.flatMap((page: { results: PokemonItem[] }) => page.results) ||
      []
    );
  }, [data]);

  const renderPokemonCard = useCallback(({ item }: { item: PokemonItem }) => {
    const pokemonId = Number(getPokemonId(item.url));
    const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`;

    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('PokemonDetail', {
            pokemonId,
          })
        }
        style={styles.cardWrapper}
      >
        <CardPokemon
          id={pokemonId}
          name={item.name.toUpperCase()}
          imageUrl={image}
        />
      </TouchableOpacity>
    );
  }, []);

  const handleLoadMore = useCallback(() => {
    if (!isFetchingNextPage && hasNextPage) {
      fetchNextPage();
    }
  }, [isFetchingNextPage, hasNextPage, fetchNextPage]);

  const ListFooterComponent = useCallback(() => {
    if (!isFetchingNextPage && !hasNextPage && allPokemons.length > 0) {
      return (
        <View style={styles.footerContainer}>
          <Text style={styles.endText}>✓ Se cargaron todos los pokémons</Text>
        </View>
      );
    }

    if (isFetchingNextPage) {
      return (
        <View style={styles.footerContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.footerText}>Cargando más pokémons...</Text>
        </View>
      );
    }

    return null;
  }, [isFetchingNextPage, hasNextPage, allPokemons.length]);

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loadingText}>Cargando pokémons...</Text>
      </View>
    );
  }

  if (isError) {
    return <ErrorScreen onRetry={refetch} error={error?.message || error} />;
  }

  if (!allPokemons || allPokemons.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.emptyText}>No hay pokémons para mostrar</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={allPokemons}
      keyExtractor={(item) => item.url}
      renderItem={renderPokemonCard}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={ListFooterComponent}
      refreshControl={
        <RefreshControl
          refreshing={isLoading}
          onRefresh={() => refetch()}
          tintColor={COLORS.primary}
        />
      }
      contentContainerStyle={styles.listContainer}
      scrollEnabled={true}
      numColumns={1}
    />
  );
};

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.backgroundScreen,
    paddingHorizontal: 30,
  },
  listContainer: {
    backgroundColor: COLORS.backgroundScreen,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  cardWrapper: {
    marginBottom: 12,
  },
  footerContainer: {
    paddingVertical: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerText: {
    marginTop: 8,
    fontSize: 14,
    color: COLORS.text,
    opacity: 0.7,
  },
  endText: {
    fontSize: 14,
    color: COLORS.text,
    opacity: 0.6,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: COLORS.text,
  },
  errorEmoji: {
    fontSize: 48,
    marginBottom: 12,
  },
  errorText: {
    fontSize: 18,
    color: COLORS.error,
    marginBottom: 8,
    fontWeight: '600',
  },
  errorMessage: {
    fontSize: 14,
    color: COLORS.text,
    marginTop: 8,
    opacity: 0.7,
  },
  emptyText: {
    fontSize: 16,
    color: COLORS.text,
    opacity: 0.6,
  },
});
