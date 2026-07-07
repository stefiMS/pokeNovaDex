import { render, fireEvent } from '@testing-library/react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useGetDetailPokemon } from '../hooks';
import { PokemonDetailScreen } from './PokemonDetailScreen';

jest.mock('@react-navigation/native');
jest.mock('../hooks/useGetDetailPokemon');

jest.mock('../components/TagType', () => {
  const React = require('react');
  const { Text } = require('react-native');

  return {
    TagType: ({ type }: { type: string }) =>
      React.createElement(Text, null, type),
  };
});

jest.mock('../components/PokemonStatBar', () => {
  const React = require('react');
  const { Text } = require('react-native');

  return {
    PokemonStatBar: ({ label, value }: { label: string; value: number }) =>
      React.createElement(Text, null, `${label} - ${value}`),
  };
});
jest.mock('@expo/vector-icons', () => ({
  Ionicons: 'Ionicons',
}));

const mockGoBack = jest.fn();

const mockedUseNavigation = jest.mocked(useNavigation);
const mockedUseRoute = jest.mocked(useRoute);
const mockedUseGetDetailPokemon = jest.mocked(useGetDetailPokemon);

describe('PokemonDetailScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    mockedUseNavigation.mockReturnValue({
      goBack: mockGoBack,
    });

    mockedUseRoute.mockReturnValue({
      key: 'detail',
      name: 'PokemonDetail',
      params: {
        pokemonId: 25,
      },
    });
  });

  it('muestra mensaje de error cuando falla la consulta', async () => {
    mockedUseGetDetailPokemon.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
    } as ReturnType<typeof useGetDetailPokemon>);

    const screen = await render(<PokemonDetailScreen />);

    expect(screen.getByText('Error al cargar el Pokémon')).toBeTruthy();
  });

  it('muestra mensaje de error cuando no hay data', async () => {
    mockedUseGetDetailPokemon.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: false,
    } as ReturnType<typeof useGetDetailPokemon>);

    const screen = await render(<PokemonDetailScreen />);

    expect(screen.getByText('Error al cargar el Pokémon')).toBeTruthy();
  });

  it('renderiza la información del pokemon', async () => {
    mockedUseGetDetailPokemon.mockReturnValue({
      data: {
        id: 25,
        name: 'pikachu',
        height: 4,
        weight: 60,
        types: [
          {
            type: {
              name: 'electric',
            },
          },
        ],
        stats: [
          {
            base_stat: 55,
            stat: {
              name: 'attack',
            },
          },
          {
            base_stat: 90,
            stat: {
              name: 'speed',
            },
          },
        ],
      },
      isLoading: false,
      isError: false,
    } as ReturnType<typeof useGetDetailPokemon>);

    const screen = await render(<PokemonDetailScreen />);

    expect(screen.getByText('# 25')).toBeTruthy();
    expect(screen.getByText('PIKACHU')).toBeTruthy();
    expect(screen.getByText('electric')).toBeTruthy();
    expect(screen.getByText('attack - 55')).toBeTruthy();
    expect(screen.getByText('speed - 90')).toBeTruthy();
    expect(screen.getByText('Estadísticas')).toBeTruthy();
    expect(screen.getByText('Height')).toBeTruthy();
    expect(screen.getByText('Weight')).toBeTruthy();
    expect(screen.getByText('0.4 m')).toBeTruthy();
    expect(screen.getByText('6 kg')).toBeTruthy();
  });

  it('ejecuta goBack al presionar regresar', async () => {
    mockedUseGetDetailPokemon.mockReturnValue({
      data: {
        id: 25,
        name: 'pikachu',
        height: 4,
        weight: 60,
        types: [],
        stats: [],
      },
      isLoading: false,
      isError: false,
    } as ReturnType<typeof useGetDetailPokemon>);

    const screen = await render(<PokemonDetailScreen />);

    const button = screen.getByLabelText('go-back');

    fireEvent.press(button);

    expect(mockGoBack).toHaveBeenCalledTimes(1);
  });
});
