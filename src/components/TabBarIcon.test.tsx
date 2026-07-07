import { render } from '@testing-library/react-native';
import { TabBarIcon } from './TabBarIcon';

jest.mock('@expo/vector-icons', () => {
  const React = require('react');
  const { Text } = require('react-native');

  return {
    Ionicons: ({ name }: { name: string }) =>
      React.createElement(Text, null, `Ionicons-${name}`),

    MaterialCommunityIcons: ({ name }: { name: string }) =>
      React.createElement(Text, null, `MaterialCommunityIcons-${name}`),
  };
});

describe('TabBarIcon', () => {
  it('renders pokeball icon for HomeTab', async () => {
    const screen = await render(
      <TabBarIcon route="HomeTab" color="red" size={24} focused={false} />,
    );

    expect(screen.getByText('MaterialCommunityIcons-pokeball')).toBeTruthy();
  });

  it('renders person icon when ProfileTab is focused', async () => {
    const screen = await render(
      <TabBarIcon route="ProfileTab" color="blue" size={24} focused />,
    );

    expect(screen.getByText('Ionicons-person')).toBeTruthy();
  });

  it('renders person-outline icon when ProfileTab is not focused', async () => {
    const screen = await render(
      <TabBarIcon route="ProfileTab" color="blue" size={24} focused={false} />,
    );

    expect(screen.getByText('Ionicons-person-outline')).toBeTruthy();
  });

  it('renders nothing for unknown route', async () => {
    const screen = await render(
      <TabBarIcon route="UnknownTab" color="blue" size={24} focused={false} />,
    );

    expect(screen.toJSON()).toBeNull();
  });
});
