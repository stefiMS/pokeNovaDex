import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Step1Screen, Step2Screen, TrainerSummaryScreen } from '../screens';
import { COLORS } from '../theme';
import { Ionicons } from '@expo/vector-icons';

const ProfileStack = createNativeStackNavigator();

export const ProfileStackNavigator = () => (
  <ProfileStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: COLORS.surface,
      },
      headerTintColor: COLORS.black,
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 24,
      },
    }}
  >
    <ProfileStack.Screen
      name="TrainerStep1"
      component={Step1Screen}
      options={{
        title: 'Tarjeta de Entrenador',
        headerLeft: () => (
          <Ionicons
            name="person"
            size={32}
            color={COLORS.interactive}
            style={{ marginRight: 10 }}
          />
        ),
      }}
    />

    <ProfileStack.Screen
      name="TrainerStep2"
      component={Step2Screen}
      options={{
        title: 'Tarjeta de Entrenador',
      }}
    />

    <ProfileStack.Screen
      name="TrainerSummary"
      component={TrainerSummaryScreen}
      options={{
        title: 'Tarjeta de Entrenador',
      }}
    />
  </ProfileStack.Navigator>
);
