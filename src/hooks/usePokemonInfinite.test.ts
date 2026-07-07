import { useInfiniteQuery } from '@tanstack/react-query';

import { getPokemonList } from '../api';
import { usePokemonInfinite } from './usePokemonInfinite';

jest.mock('@tanstack/react-query', () => ({
  useInfiniteQuery: jest.fn(),
}));

jest.mock('../api', () => ({
  getPokemonList: jest.fn(),
}));

const mockedUseInfiniteQuery = jest.mocked(useInfiniteQuery);

describe('usePokemonInfinite', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should configure useInfiniteQuery correctly', () => {
    usePokemonInfinite();

    expect(mockedUseInfiniteQuery).toHaveBeenCalledWith({
      queryKey: ['pokemonList'],
      queryFn: expect.any(Function),
      initialPageParam: 0,
      getNextPageParam: expect.any(Function),
      staleTime: 1000 * 60 * 5,
    });
  });

  it('should call getPokemonList with pageParam', async () => {
    usePokemonInfinite();

    const options = mockedUseInfiniteQuery.mock.calls[0][0];

    const queryFn = options.queryFn as ({
      pageParam,
    }: {
      pageParam: number;
    }) => Promise<unknown>;

    await queryFn({
      pageParam: 20,
    });

    expect(getPokemonList).toHaveBeenCalledWith(20);
  });

  it('should return undefined when there is no next page', () => {
    usePokemonInfinite();

    const options = mockedUseInfiniteQuery.mock.calls[0][0];

    const result = options.getNextPageParam(
      {
        next: null,
      },
      [],
      undefined,
      false,
    );

    expect(result).toBeUndefined();
  });

  it('should return the next offset from the url', () => {
    usePokemonInfinite();

    const options = mockedUseInfiniteQuery.mock.calls[0][0];

    const result = options.getNextPageParam(
      {
        next: 'https://pokeapi.co/api/v2/pokemon?offset=40&limit=20',
      },
      [],
      undefined,
      false,
    );

    expect(result).toBe(40);
  });

  it('should return zero when offset is missing', () => {
    usePokemonInfinite();

    const options = mockedUseInfiniteQuery.mock.calls[0][0];

    const result = options.getNextPageParam(
      {
        next: 'https://pokeapi.co/api/v2/pokemon?limit=20',
      },
      [],
      undefined,
      false,
    );

    expect(result).toBe(0);
  });
});
