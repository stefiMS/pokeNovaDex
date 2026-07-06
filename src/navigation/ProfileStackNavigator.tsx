import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProfileScreen } from '../screens';

const ProfileStack = createNativeStackNavigator();

export const ProfileStackNavigator = () => (
  <ProfileStack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: '#34C759' },
      headerTintColor: '#fff',
      headerTitleStyle: { fontWeight: 'bold' },
    }}
  >
    <ProfileStack.Screen
      name="ProfileTab"
      component={ProfileScreen}
      options={{ title: 'User Profile' }}
    />
  </ProfileStack.Navigator>
);

// export default ProfileStackNavigator;
