import { render } from '@testing-library/react-native';

import { TabNavigator } from './TabNavigator';

jest.mock('../components', () => ({
  TabBarIcon: () => null,
}));

jest.mock('./HomeStackNavigator', () => ({
  HomeStackNavigator: () => null,
}));

jest.mock('./ProfileStackNavigator', () => ({
  ProfileStackNavigator: () => null,
}));

jest.mock('@react-navigation/bottom-tabs', () => ({
  createBottomTabNavigator: () => {
    return {
      Navigator: ({ children }: { children: React.ReactNode }) => children,

      Screen: () => null,
    };
  },
}));

const mockScreenOptions = jest.fn();

jest.mock('@react-navigation/bottom-tabs', () => ({
  createBottomTabNavigator: () => ({
    Navigator: ({
      children,
      screenOptions,
    }: {
      children: React.ReactNode;
      screenOptions: (props: { route: { name: string } }) => object;
    }) => {
      mockScreenOptions(
        screenOptions({
          route: {
            name: 'HomeTab',
          },
        }),
      );

      return children;
    },

    Screen: () => null,
  }),
}));

describe('TabNavigator', () => {
  it('should render without crashing', () => {
    const screen = render(<TabNavigator />);

    expect(screen).toBeTruthy();
  });

  it('should create the navigator component', () => {
    const element = TabNavigator();

    expect(element).toBeTruthy();
  });
  it('should configure screen options', () => {
    render(<TabNavigator />);

    expect(mockScreenOptions).toHaveBeenCalled();
  });
  it('should create Pokédex label', () => {
    render(<TabNavigator />);

    const options = mockScreenOptions.mock.calls[0][0];

    const label = options.tabBarLabel({
      color: 'blue',
    });

    expect(label).toBeTruthy();
  });
});
