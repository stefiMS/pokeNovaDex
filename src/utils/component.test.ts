import { getPokemonId, getStatColor } from './component';

describe('getPokemonId', () => {
  it('returns pokemon id from url', () => {
    const url = 'https://pokeapi.co/api/v2/pokemon/25/';

    expect(getPokemonId(url)).toBe('25');
  });

  it('returns pokemon id when url does not end with slash', () => {
    const url = 'https://pokeapi.co/api/v2/pokemon/150';

    expect(getPokemonId(url)).toBe('150');
  });

  it('returns empty string for empty url', () => {
    expect(getPokemonId('')).toBe('');
  });
});

describe('getStatColor', () => {
  it('returns green for values greater than or equal to 100', () => {
    expect(getStatColor(100)).toBe('#22C55E');
    expect(getStatColor(120)).toBe('#22C55E');
  });

  it('returns blue for values between 70 and 99', () => {
    expect(getStatColor(70)).toBe('#3B82F6');
    expect(getStatColor(80)).toBe('#3B82F6');
    expect(getStatColor(99)).toBe('#3B82F6');
  });

  it('returns lime for values less than 70', () => {
    expect(getStatColor(0)).toBe('#84CC16');
    expect(getStatColor(50)).toBe('#84CC16');
    expect(getStatColor(69)).toBe('#84CC16');
  });
});
