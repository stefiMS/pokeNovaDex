export const getPokemonId = (url: string): string => {
  return url.split('/').filter(Boolean).pop() || '';
};
