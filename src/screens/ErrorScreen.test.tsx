import { render, fireEvent } from '@testing-library/react-native';

import { ErrorScreen } from './ErrorScreen';

jest.mock('@expo/vector-icons', () => {
  const React = require('react');
  const { Text } = require('react-native');

  return {
    Ionicons: ({ name }: { name: string }) =>
      React.createElement(Text, null, `Icon-${name}`),
  };
});

describe('ErrorScreen', () => {
  it('renders title', async () => {
    const screen = await render(<ErrorScreen onRetry={jest.fn()} />);

    expect(
      screen.getByText('¡Ups! No pudimos cargar los Pokémon'),
    ).toBeTruthy();
  });

  it('renders error string', async () => {
    const screen = await render(
      <ErrorScreen onRetry={jest.fn()} error="Error de conexión" />,
    );

    expect(screen.getByText('Error de conexión')).toBeTruthy();
  });

  it('renders error message from object', async () => {
    const screen = await render(
      <ErrorScreen onRetry={jest.fn()} error={{ message: 'API Error' }} />,
    );

    expect(screen.getByText('API Error')).toBeTruthy();
  });

  it('renders retry button', async () => {
    const screen = await render(<ErrorScreen onRetry={jest.fn()} />);

    expect(screen.getByText('Reintentar')).toBeTruthy();
  });

  it('calls onRetry when button is pressed', async () => {
    const onRetryMock = jest.fn();

    const screen = await render(<ErrorScreen onRetry={onRetryMock} />);

    fireEvent.press(screen.getByText('Reintentar'));

    expect(onRetryMock).toHaveBeenCalledTimes(1);
  });
});
