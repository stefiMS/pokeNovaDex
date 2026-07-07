import { render } from '@testing-library/react-native';

import { AppNavigator } from './AppNavigator';

jest.mock('@react-navigation/native-stack', () => ({
  createNativeStackNavigator: () => {
    return {
      Navigator: ({ children }: { children: React.ReactNode }) => children,

      Screen: () => null,
    };
  },
}));

jest.mock('./TabNavigator', () => ({
  TabNavigator: () => null,
}));

describe('AppNavigator', () => {
  it('renders successfully', () => {
    const screen = render(<AppNavigator />);

    expect(screen).toBeTruthy();
  });

  it('creates the navigator component', () => {
    const element = AppNavigator();

    expect(element).toBeTruthy();
  });
});
