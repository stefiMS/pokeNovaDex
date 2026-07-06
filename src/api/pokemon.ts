import { api } from './api';

export const getPokemons = async () => {
  const response = await api.get('/pokemon');

  return response.data;
};

export const getPokemonById = async (id: number) => {
  const response = await api.get(`/pokemon/${id}`);

  return response.data;
};

export const getPokemonList = async (offset = 0, limit = 20) => {
  const { data } = await api.get(`/pokemon?limit=${limit}&offset=${offset}`);

  return data;
};

export const getPokemonByName = async (name: string) => {
  const { data } = await api.get(`/pokemon/${name}`);

  return data;
};
