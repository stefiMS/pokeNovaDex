import { getPokemonList } from '../api';

import { useInfiniteQuery } from '@tanstack/react-query';

export const usePokemonInfinite = () => {
  return useInfiniteQuery({
    queryKey: ['pokemonList'],
    queryFn: ({ pageParam }) => getPokemonList(pageParam),

    initialPageParam: 0,

    getNextPageParam: (lastPage) => {
      if (!lastPage.next) return undefined;

      const url = new URL(lastPage.next);

      return Number(url.searchParams.get('offset'));
    },

    staleTime: 1000 * 60 * 5,
  });
};
