import { render } from '@testing-library/react-native';
import { CardPokemon } from './CardPokemon';

describe('CardPokemon', () => {
  it('renders pokemon name', async () => {
    const screen = await render(
      <CardPokemon
        id={25}
        name="Pikachu"
        imageUrl="https://pokeapi.co/media/pikachu.png"
      />,
    );

    expect(screen.getByText('Pikachu')).toBeTruthy();
  });
});
