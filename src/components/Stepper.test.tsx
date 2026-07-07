import { render } from '@testing-library/react-native';
import { Stepper } from './Stepper';

jest.mock('@expo/vector-icons', () => ({
  Ionicons: 'Ionicons',
}));

describe('Stepper', () => {
  it('renders current step information', async () => {
    const screen = await render(<Stepper currentStep={2} totalSteps={5} />);

    expect(screen.getByText('Paso 2 de 5')).toBeTruthy();
  });

  it('renders first step correctly', async () => {
    const screen = await render(<Stepper currentStep={1} totalSteps={5} />);

    expect(screen.getByText('Paso 1 de 5')).toBeTruthy();
  });

  it('renders last step correctly', async () => {
    const screen = await render(<Stepper currentStep={5} totalSteps={5} />);

    expect(screen.getByText('Paso 5 de 5')).toBeTruthy();
  });

  it('updates information when props change', async () => {
    const screen = await render(<Stepper currentStep={3} totalSteps={6} />);

    expect(screen.getByText('Paso 3 de 6')).toBeTruthy();
  });
});
