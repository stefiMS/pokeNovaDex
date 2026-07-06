import { useQuery } from '@tanstack/react-query';
import { getPokemonById } from '../api';

export const useGetDetailPokemon = (id: number) => {
  return useQuery({
    queryKey: ['pokemon-detail', id],
    queryFn: () => getPokemonById(id),
    enabled: !!id,
  });
};
