import { Text } from 'react-native';
import { fireEvent, render } from '@testing-library/react-native';
import { PrimaryButton } from './PrimaryButton';

describe('PrimaryButton', () => {
  it('renders the title', async () => {
    const screen = await render(
      <PrimaryButton title="Buscar" onPress={jest.fn()} />,
    );

    expect(screen.getByText('Buscar')).toBeTruthy();
  });

  it('calls onPress when pressed', async () => {
    const onPressMock = jest.fn();

    const screen = await render(
      <PrimaryButton title="Buscar" onPress={onPressMock} />,
    );

    fireEvent.press(screen.getByText('Buscar'));

    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it('does not call onPress when disabled', async () => {
    const onPressMock = jest.fn();

    const screen = await render(
      <PrimaryButton title="Buscar" onPress={onPressMock} disabled />,
    );

    fireEvent.press(screen.getByText('Buscar'));

    expect(onPressMock).not.toHaveBeenCalled();
  });

  it('does not render title when loading is true', async () => {
    const screen = await render(
      <PrimaryButton title="Buscar" onPress={jest.fn()} loading />,
    );

    expect(screen.queryByText('Buscar')).toBeNull();
  });

  it('renders icon when provided', async () => {
    const screen = await render(
      <PrimaryButton
        title="Buscar"
        onPress={jest.fn()}
        icon={<Text>🔍</Text>}
      />,
    );

    expect(screen.getByText('🔍')).toBeTruthy();
  });
  it('renders outline variant correctly', async () => {
    const screen = await render(
      <PrimaryButton title="Editar" onPress={jest.fn()} variant="outline" />,
    );

    expect(screen.getByText('Editar')).toBeTruthy();
  });
  it('renders with custom width', async () => {
    const screen = await render(
      <PrimaryButton title="Buscar" onPress={jest.fn()} width="50%" />,
    );

    expect(screen.getByText('Buscar')).toBeTruthy();
  });
});
