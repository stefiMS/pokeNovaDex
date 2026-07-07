import { render } from '@testing-library/react-native';
import { TextFieldInput } from './TextFieldInput';

describe('TextFieldInput', () => {
  it('renders label', async () => {
    const screen = await render(<TextFieldInput label="Nombre" />);

    expect(screen.getByText('Nombre')).toBeTruthy();
  });

  it('renders required indicator', async () => {
    const screen = await render(<TextFieldInput label="Nombre" required />);

    expect(screen.getByText('*')).toBeTruthy();
  });

  it('renders error message', async () => {
    const screen = await render(
      <TextFieldInput label="Nombre" error="Campo obligatorio" />,
    );

    expect(screen.getByText('Campo obligatorio')).toBeTruthy();
  });

  it('does not render error message when error is not provided', async () => {
    const screen = await render(<TextFieldInput label="Nombre" />);

    expect(screen.queryByText('Campo obligatorio')).toBeNull();
  });

  it('renders placeholder', async () => {
    const screen = await render(
      <TextFieldInput label="Nombre" placeholder="Ingrese su nombre" />,
    );

    expect(screen.getByPlaceholderText('Ingrese su nombre')).toBeTruthy();
  });
});
