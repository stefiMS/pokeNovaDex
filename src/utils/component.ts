export const getPokemonId = (url: string): string => {
  return url.split('/').filter(Boolean).pop() || '';
};

export const getStatColor = (value: number) => {
  if (value >= 100) return '#22C55E';
  if (value >= 70) return '#3B82F6';

  return '#84CC16';
};
