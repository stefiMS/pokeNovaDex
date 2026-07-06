// import { useEffect, useState } from 'react';
import { getPokemonList } from '../api';

// export const usePokemon = () => {
//   const [pokemons, setPokemons] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const fetchPokemons = async () => {
//     try {
//       setLoading(true);

//       const data = await getPokemons();

//       setPokemons(data.results);
//     } catch (err) {
//       console.error(err);
//       setError('Ocurrió un error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPokemons();
//   }, []);

//   return {
//     pokemons,
//     loading,
//     error,
//     fetchPokemons,
//   };
// };

import { useInfiniteQuery } from '@tanstack/react-query';

export const usePokemonInfinite = () => {
  return useInfiniteQuery({
    queryKey: ['pokemonList'],
    queryFn: ({ pageParam }) => getPokemonList(pageParam as number),

    initialPageParam: 0,

    getNextPageParam: (lastPage) => {
      if (!lastPage.next) return undefined;

      const url = new URL(lastPage.next);

      return Number(url.searchParams.get('offset'));
    },

    staleTime: 1000 * 60 * 5,
  });
};
