import { render, fireEvent } from '@testing-library/react-native';
import { useNavigation } from '@react-navigation/native';

import { TrainerSummaryScreen } from './TrainerSummaryScreen';
import { useTrainerStore } from '../store/useTrainerStore';

const mockGoBack = jest.fn();
const mockNavigate = jest.fn();

jest.mock('@expo/vector-icons', () => ({
  Ionicons: () => null,
  MaterialCommunityIcons: () => null,
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

describe('TrainerSummaryScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    jest.mocked(useNavigation).mockReturnValue({
      goBack: mockGoBack,
      navigate: mockNavigate,
    });

    const trainerState = {
      trainer: {
        fullName: 'Ash Ketchum',
        age: 15,
        email: 'ash@pokemon.com',
        district: 'Lima',
        favoriteType: 'fire,electric',
      },
      setTrainer: jest.fn(),
    };

    (
      useTrainerStore as jest.MockedFunction<typeof useTrainerStore>
    ).mockImplementation((selector) => selector(trainerState));
  });

  it('renderiza correctamente el resumen', async () => {
    const screen = await render(<TrainerSummaryScreen />);

    expect(screen.getByText('Resumen del Carnet de Entrenador')).toBeTruthy();

    expect(screen.getByText('Ash Ketchum')).toBeTruthy();

    expect(screen.getByText('15 años')).toBeTruthy();

    expect(screen.getByText('ash@pokemon.com')).toBeTruthy();

    expect(screen.getByText('Lima')).toBeTruthy();
  });

  it('muestra los tipos favoritos', async () => {
    const screen = await render(<TrainerSummaryScreen />);

    expect(screen.getByText('FUEGO')).toBeTruthy();

    expect(screen.getByText('ELÉCTRICO')).toBeTruthy();
  });

  it('ejecuta goBack al presionar Editar', async () => {
    const screen = await render(<TrainerSummaryScreen />);

    fireEvent.press(screen.getByText('Editar'));

    expect(mockGoBack).toHaveBeenCalledTimes(1);
  });

  it('navega a HomeTab al presionar Completar', async () => {
    const screen = await render(<TrainerSummaryScreen />);

    fireEvent.press(screen.getByText('Completar'));

    expect(mockNavigate).toHaveBeenCalledWith('HomeTab');
  });

  it('muestra "No seleccionado" cuando no existen tipos favoritos', async () => {
    (
      useTrainerStore as jest.MockedFunction<typeof useTrainerStore>
    ).mockImplementation((selector) =>
      selector({
        trainer: {
          fullName: 'Ash Ketchum',
          age: 15,
          email: 'ash@pokemon.com',
          district: 'Lima',
          favoriteType: '',
        },
        setTrainer: jest.fn(),
      }),
    );

    const screen = await render(<TrainerSummaryScreen />);

    expect(screen.getByText('No seleccionado')).toBeTruthy();
  });
});
