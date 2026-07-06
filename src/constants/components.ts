import { PokemonType } from '../theme';

export const DISTRICT_LIST = [
  { value: 'Ate', label: 'Ate' },
  { value: 'Breña', label: 'Breña' },
  { value: 'Miraflores', label: 'Miraflores' },
  { value: 'Kanto', label: 'Kanto' },
  { value: 'Johto', label: 'Johto' },
];

export const POKEMON_TYPE_EMOJIS: Record<PokemonType, string> = {
  normal: '⚪',
  fire: '🔥',
  water: '💧',
  electric: '⚡',
  grass: '🌿',
  ice: '❄️',
  fighting: '🥊',
  poison: '☠️',
  ground: '🌎',
  flying: '🕊️',
  psychic: '🔮',
  bug: '🐛',
  rock: '🪨',
  ghost: '👻',
  dragon: '🐉',
  dark: '🌑',
  steel: '⚙️',
  fairy: '🧚',
};
