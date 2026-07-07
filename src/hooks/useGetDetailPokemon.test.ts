import { useQuery, type QueryFunction } from '@tanstack/react-query';

import { getPokemonById } from '../api';
import { useGetDetailPokemon } from './useGetDetailPokemon';

jest.mock('@tanstack/react-query', () => ({
  useQuery: jest.fn(),
}));

jest.mock('../api', () => ({
  getPokemonById: jest.fn(),
}));

const mockedUseQuery = jest.mocked(useQuery);

describe('useGetDetailPokemon', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should configure useQuery correctly', () => {
    useGetDetailPokemon(25);

    expect(mockedUseQuery).toHaveBeenCalledWith({
      queryKey: ['pokemon-detail', 25],
      queryFn: expect.any(Function),
      enabled: true,
    });
  });

  it('should enable the query when id is greater than zero', () => {
    useGetDetailPokemon(1);

    expect(mockedUseQuery).toHaveBeenCalledWith(
      expect.objectContaining({
        enabled: true,
      }),
    );
  });

  it('should disable the query when id is zero', () => {
    useGetDetailPokemon(0);

    expect(mockedUseQuery).toHaveBeenCalledWith(
      expect.objectContaining({
        enabled: false,
      }),
    );
  });

  it('should execute getPokemonById from queryFn', async () => {
    useGetDetailPokemon(25);

    const queryOptions = mockedUseQuery.mock.calls[0][0];

    const queryFn = queryOptions.queryFn as QueryFunction;

    await queryFn({
      queryKey: ['pokemon-detail', 25],
      client: {} as never,
      meta: undefined,
      signal: new AbortController().signal,
    });

    expect(getPokemonById).toHaveBeenCalledWith(25);
  });
});
