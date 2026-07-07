import { render } from '@testing-library/react-native';
import { TagType } from './TagType';
import { POKEMON_TYPE_LABELS } from '../theme';

describe('TagType', () => {
  it('renders fire type label', async () => {
    const screen = await render(<TagType type="fire" />);

    expect(screen.getByText(POKEMON_TYPE_LABELS.fire)).toBeTruthy();
  });

  it('renders water type label', async () => {
    const screen = await render(<TagType type="water" />);

    expect(screen.getByText(POKEMON_TYPE_LABELS.water)).toBeTruthy();
  });

  it('renders grass type label', async () => {
    const screen = await render(<TagType type="grass" />);

    expect(screen.getByText(POKEMON_TYPE_LABELS.grass)).toBeTruthy();
  });
});
