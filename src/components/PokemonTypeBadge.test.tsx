import { render } from '@testing-library/react-native';
import { View } from 'react-native';

import { PokemonTypeBadge } from './PokemonTypeBadge';
import { POKEMON_TYPE_LABELS, COLORS_POKEMON_TYPE } from '../theme';
import { POKEMON_TYPE_EMOJIS } from '../constants';

describe('PokemonTypeBadge', () => {
  it('renders the pokemon type label', async () => {
    const screen = await render(<PokemonTypeBadge type="fire" />);

    expect(screen.getByText(POKEMON_TYPE_LABELS.fire)).toBeTruthy();
  });

  it('renders the pokemon type emoji', async () => {
    const screen = await render(<PokemonTypeBadge type="fire" />);

    expect(screen.getByText(POKEMON_TYPE_EMOJIS.fire)).toBeTruthy();
  });
});
