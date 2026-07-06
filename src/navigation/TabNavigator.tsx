import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ProfileStackNavigator } from './ProfileStackNavigator';
import { Text, StyleSheet } from 'react-native';
import { TabBarIcon } from '../components';
import { HomeStackNavigator } from './HomeStackNavigator';
import { COLORS } from '../theme';

const Tab = createBottomTabNavigator();

export const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarActiveTintColor: `${COLORS.interactive}`,
      tabBarInactiveTintColor: `${COLORS.inactive}`,
      tabBarStyle: {
        backgroundColor: `${COLORS.background}`,
        borderTopWidth: 1,
        borderTopColor: `${COLORS.border}`,
      },

      tabBarIcon: ({ color, size, focused }) => (
        <TabBarIcon
          route={route.name}
          color={color}
          size={size}
          focused={focused}
        />
      ),

      tabBarLabel: ({ color }) => (
        <Text style={[styles.textBarLabel, { color }]}>
          {route.name === 'HomeTab' ? 'Pokédex' : 'Entrenador'}
        </Text>
      ),
    })}
  >
    <Tab.Screen name="HomeTab" component={HomeStackNavigator} />

    <Tab.Screen name="ProfileTab" component={ProfileStackNavigator} />
  </Tab.Navigator>
);

const styles = StyleSheet.create({
  textBarLabel: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});
