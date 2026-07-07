import { render } from '@testing-library/react-native';

import { HomeStackNavigator } from './HomeStackNavigator';

jest.mock('@react-navigation/native-stack', () => ({
  createNativeStackNavigator: () => {
    return {
      Navigator: ({ children }: { children: React.ReactNode }) => children,

      Screen: () => null,
    };
  },
}));

jest.mock('@expo/vector-icons/MaterialCommunityIcons', () => {
  return 'MaterialCommunityIcons';
});

jest.mock('../screens', () => ({
  HomeScreen: () => null,
  PokemonDetailScreen: () => null,
}));

describe('HomeStackNavigator', () => {
  it('should render without crashing', () => {
    const screen = render(<HomeStackNavigator />);

    expect(screen).toBeTruthy();
  });

  it('should create the stack navigator', () => {
    const element = HomeStackNavigator();

    expect(element).toBeTruthy();
  });
});
