import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { HomeScreen } from '../screens';s
import { TabNavigator } from './TabNavigator';
const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MainTabs"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      {/* <Stack.Screen
        name="Home"
        component={HomeScreen}
        // options={{ headerShown: false }}
      /> */}
    </Stack.Navigator>
  );
};
