import { render } from '@testing-library/react-native';

import { HomeScreen } from './HomeScreen';
import { usePokemonInfinite } from '../hooks/usePokemonInfinite';

jest.mock('@expo/vector-icons', () => ({
  Ionicons: () => null,
  MaterialCommunityIcons: () => null,
}));

jest.mock('../hooks/usePokemonInfinite');

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

jest.mock('../components/CardPokemon', () => {
  const { Text } = require('react-native');

  return {
    CardPokemon: ({ name }: { name: string }) => <Text>{name}</Text>,
  };
});

jest.mock('../screens/ErrorScreen', () => {
  const { Text } = require('react-native');

  return {
    ErrorScreen: ({ error }: { error: string }) => <Text>{error}</Text>,
  };
});

const mockedUsePokemonInfinite = jest.mocked(usePokemonInfinite);

type PokemonItem = {
  name: string;
  url: string;
};

type MockHookReturn = ReturnType<typeof usePokemonInfinite>;

const createHookResponse = (
  overrides: Partial<MockHookReturn>,
): MockHookReturn =>
  ({
    data: undefined,
    isLoading: false,
    isError: false,
    error: null,
    hasNextPage: false,
    isFetchingNextPage: false,
    fetchNextPage: jest.fn(),
    refetch: jest.fn(),
    status: 'success',
    fetchStatus: 'idle',
    isFetching: false,
    isPending: false,
    isSuccess: true,
    isRefetching: false,
    isFetched: true,
    isFetchedAfterMount: true,
    isLoadingError: false,
    isPaused: false,
    isPlaceholderData: false,
    isRefetchError: false,
    promise: Promise.resolve(),
    ...overrides,
  }) as MockHookReturn;

describe('HomeScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state', async () => {
    mockedUsePokemonInfinite.mockReturnValue(
      createHookResponse({
        isLoading: true,
      }),
    );

    const screen = await render(<HomeScreen />);

    expect(screen.getByText('Cargando pokémons...')).toBeTruthy();
  });

  it('renders error state', async () => {
    mockedUsePokemonInfinite.mockReturnValue(
      createHookResponse({
        isError: true,
        error: {
          message: 'API Error',
          name: '',
        },
      }),
    );

    const screen = await render(<HomeScreen />);

    expect(screen.getByText('API Error')).toBeTruthy();
  });

  it('renders empty state', async () => {
    mockedUsePokemonInfinite.mockReturnValue(
      createHookResponse({
        data: {
          pages: [],
          pageParams: [],
        },
      }),
    );

    const screen = await render(<HomeScreen />);

    expect(screen.getByText('No hay pokémons para mostrar')).toBeTruthy();
  });

  it('renders pokemon list', async () => {
    const pokemons: PokemonItem[] = [
      {
        name: 'pikachu',
        url: 'https://pokeapi.co/api/v2/pokemon/25/',
      },
    ];

    mockedUsePokemonInfinite.mockReturnValue(
      createHookResponse({
        data: {
          pages: [
            {
              results: pokemons,
            },
          ],
          pageParams: [],
        },
      }),
    );

    const screen = await render(<HomeScreen />);

    expect(screen.getByText('PIKACHU')).toBeTruthy();
  });

  it('renders footer when all pokemons are loaded', async () => {
    const pokemons: PokemonItem[] = [
      {
        name: 'pikachu',
        url: 'https://pokeapi.co/api/v2/pokemon/25/',
      },
    ];

    mockedUsePokemonInfinite.mockReturnValue(
      createHookResponse({
        hasNextPage: false,
        isFetchingNextPage: false,
        data: {
          pages: [
            {
              results: pokemons,
            },
          ],
          pageParams: [],
        },
      }),
    );

    const screen = await render(<HomeScreen />);

    expect(screen.getByText('✓ Se cargaron todos los pokémons')).toBeTruthy();
  });
});
