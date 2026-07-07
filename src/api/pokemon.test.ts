import { api } from './api';
import {
  getPokemons,
  getPokemonById,
  getPokemonList,
  getPokemonByName,
} from './pokemon';

jest.mock('./api', () => ({
  api: {
    get: jest.fn(),
  },
}));

const mockedGet = jest.mocked(api.get);

describe('pokemon services', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should get pokemons', async () => {
    const mockData = {
      results: [{ name: 'pikachu' }],
    };

    mockedGet.mockResolvedValue({
      data: mockData,
    });

    const result = await getPokemons();

    expect(mockedGet).toHaveBeenCalledWith('/pokemon');

    expect(result).toEqual(mockData);
  });

  it('should get pokemon by id', async () => {
    const mockData = {
      id: 25,
      name: 'pikachu',
    };

    mockedGet.mockResolvedValue({
      data: mockData,
    });

    const result = await getPokemonById(25);

    expect(mockedGet).toHaveBeenCalledWith('/pokemon/25');

    expect(result).toEqual(mockData);
  });

  it('should get pokemon list with default values', async () => {
    const mockData = {
      results: [],
    };

    mockedGet.mockResolvedValue({
      data: mockData,
    });

    const result = await getPokemonList();

    expect(mockedGet).toHaveBeenCalledWith('/pokemon?limit=20&offset=0');

    expect(result).toEqual(mockData);
  });

  it('should get pokemon list with custom values', async () => {
    const mockData = {
      results: [],
    };

    mockedGet.mockResolvedValue({
      data: mockData,
    });

    const result = await getPokemonList(20, 50);

    expect(mockedGet).toHaveBeenCalledWith('/pokemon?limit=50&offset=20');

    expect(result).toEqual(mockData);
  });

  it('should get pokemon by name', async () => {
    const mockData = {
      id: 25,
      name: 'pikachu',
    };

    mockedGet.mockResolvedValue({
      data: mockData,
    });

    const result = await getPokemonByName('pikachu');

    expect(mockedGet).toHaveBeenCalledWith('/pokemon/pikachu');

    expect(result).toEqual(mockData);
  });
});
