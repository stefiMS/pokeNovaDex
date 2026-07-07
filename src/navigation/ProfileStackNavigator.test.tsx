import { ProfileStackNavigator } from './ProfileStackNavigator';

jest.mock('@expo/vector-icons', () => ({
  Ionicons: 'Ionicons',
}));

jest.mock('../screens', () => ({
  Step1Screen: () => null,
  Step2Screen: () => null,
  TrainerSummaryScreen: () => null,
}));

describe('ProfileStackNavigator', () => {
  it('contiene las pantallas configuradas', () => {
    const element = ProfileStackNavigator();

    expect(element).toBeTruthy();
  });
});
