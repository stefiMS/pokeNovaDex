export type PokemonListResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonItem[];
};

export type PokemonItem = {
  name: string;
  url: string;
  imageUrl?: string;
};

export type PokemonType = {
  slot: number;
  type: {
    name: string;
    url: string;
  };
};

export type PokemonSprites = {
  front_default: string | null;
  other?: {
    'official-artwork'?: {
      front_default: string | null;
    };
  };
};
export type PokemonStat = {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
};
export type Pokemon = {
  id: number;
  name: string;
  types: PokemonType[];
  sprites: PokemonSprites;
  height: number;
  weight: number;
  stats: PokemonStat[];
};

export type HomeStackParamList = {
  Home: undefined;
  PokemonDetail: {
    pokemonId: number;
  };
};

export type PokemonStatBarProps = {
  label: string;
  value: number;
};
