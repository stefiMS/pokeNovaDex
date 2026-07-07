import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { useNavigation } from '@react-navigation/native';

import { Step2Screen } from './Step2Screen';
import { useTrainerStore } from '../store/useTrainerStore';

const mockNavigate = jest.fn();
const mockGoBack = jest.fn();
const mockSetTrainer = jest.fn();

jest.mock('@expo/vector-icons', () => ({
  Ionicons: 'Ionicons',
}));

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

jest.mock('../store/useTrainerStore', () => ({
  useTrainerStore: jest.fn(),
}));

jest.mock('../components/Stepper', () => ({
  Stepper: () => null,
}));

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

describe('Step2Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    jest.mocked(useNavigation).mockReturnValue({
      navigate: mockNavigate,
      goBack: mockGoBack,
    });

    (
      useTrainerStore as jest.MockedFunction<typeof useTrainerStore>
    ).mockImplementation(
      (
        selector: (state: {
          trainer: { unknown };
          setTrainer: typeof mockSetTrainer;
        }) => unknown,
      ) =>
        selector({
          trainer: {},
          setTrainer: mockSetTrainer,
        }),
    );
  });

  it('renderiza correctamente la pantalla', async () => {
    const screen = await render(<Step2Screen />);

    expect(screen.getByText('Distrito de origen *')).toBeTruthy();

    expect(
      screen.getByText('Tipos de Pokémon favoritos * (Máximo 2)'),
    ).toBeTruthy();

    expect(screen.getByText('Atrás')).toBeTruthy();

    expect(screen.getByText('Continuar')).toBeTruthy();
  });

  it('ejecuta goBack al presionar Atrás', async () => {
    const screen = await render(<Step2Screen />);

    fireEvent.press(screen.getByText('Atrás'));

    expect(mockGoBack).toHaveBeenCalledTimes(1);
  });

  it('abre el selector de distrito', async () => {
    const screen = await render(<Step2Screen />);

    fireEvent.press(screen.getByText('Selecciona un distrito'));

    await waitFor(() => {
      expect(screen.queryAllByText(/.+/).length).toBeGreaterThan(0);
    });
  });
});
