import { render } from '@testing-library/react-native';
import { PokemonStatBar } from './PokemonStatBar';

describe('PokemonStatBar', () => {
  it('renders label', async () => {
    const screen = await render(<PokemonStatBar label="HP" value={80} />);

    expect(screen.getByText('HP')).toBeTruthy();
  });

  it('renders value', async () => {
    const screen = await render(<PokemonStatBar label="HP" value={80} />);

    expect(screen.getByText('80')).toBeTruthy();
  });
});
