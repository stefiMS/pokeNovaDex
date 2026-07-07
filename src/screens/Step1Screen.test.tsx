import { render, fireEvent } from '@testing-library/react-native';

import { Step1Screen } from './Step1Screen';
import { useNavigation } from '@react-navigation/native';
import { useTrainerStore } from '../store/useTrainerStore';

const mockNavigate = jest.fn();
const mockSetTrainer = jest.fn();

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

jest.mock('../store/useTrainerStore', () => ({
  useTrainerStore: jest.fn(),
}));

jest.mock('../components/Stepper', () => ({
  Stepper: () => null,
}));

jest.mock('../components/TextFieldInput', () => {
  const { View, Text, TextInput } = require('react-native');

  return {
    TextFieldInput: ({
      label,
      value,
      onChangeText,
      placeholder,
    }: {
      label: string;
      value?: string;
      onChangeText: (value: string) => void;
      placeholder?: string;
    }) => (
      <View>
        <Text>{label}</Text>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
        />
      </View>
    ),
  };
});

jest.mock('../components/PrimaryButton', () => {
  const { TouchableOpacity, Text } = require('react-native');

  return {
    PrimaryButton: ({
      title,
      onPress,
    }: {
      title: string;
      onPress: () => void;
    }) => (
      <TouchableOpacity onPress={onPress}>
        <Text>{title}</Text>
      </TouchableOpacity>
    ),
  };
});

describe('Step1Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (useNavigation as jest.Mock).mockReturnValue({
      navigate: mockNavigate,
    });

    (useTrainerStore as unknown as jest.Mock).mockImplementation(
      (selector: (state: { setTrainer: typeof mockSetTrainer }) => unknown) =>
        selector({
          setTrainer: mockSetTrainer,
        }),
    );
  });

  it('renderiza el formulario correctamente', async () => {
    const screen = await render(<Step1Screen />);

    expect(screen.getByText('Nombre completo')).toBeTruthy();

    expect(screen.getByText('Edad')).toBeTruthy();

    expect(screen.getByText('Correo electrónico')).toBeTruthy();

    expect(screen.getByText('Continuar')).toBeTruthy();
  });

  it('permite ingresar información en los campos', async () => {
    const screen = await render(<Step1Screen />);

    const nameInput = screen.getByPlaceholderText('Ash Ketchum');

    const ageInput = screen.getByPlaceholderText('15');

    const emailInput = screen.getByPlaceholderText('ash@pokemon.com');

    fireEvent.changeText(nameInput, 'Ash Ketchum');

    fireEvent.changeText(ageInput, '15');

    fireEvent.changeText(emailInput, 'ash@pokemon.com');

    expect(nameInput).toBeTruthy();
    expect(ageInput).toBeTruthy();
    expect(emailInput).toBeTruthy();
  });
});
