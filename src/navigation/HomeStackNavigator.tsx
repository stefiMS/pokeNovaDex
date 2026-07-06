import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen, PokemonDetailScreen } from '../screens';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { COLORS } from '../theme';
import { HomeStackParamList } from '../types/pokemon';

const HomeStack = createNativeStackNavigator<HomeStackParamList>();

export const HomeStackNavigator = () => (
  <HomeStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: `${COLORS.surface}`,
      },
      headerTintColor: `${COLORS.black}`,
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 24,
      },
    }}
  >
    <HomeStack.Screen
      name="Home"
      component={HomeScreen}
      options={{
        title: 'POKÉDEX',
        headerLeft: () => (
          <MaterialCommunityIcons
            name="pokeball"
            size={32}
            color={COLORS.interactive}
            style={{ marginRight: 10 }}
          />
        ),
      }}
    />

    <HomeStack.Screen
      name="PokemonDetail"
      component={PokemonDetailScreen}
      options={{
        title: '',
        headerShown: false,
      }}
    />
  </HomeStack.Navigator>
);
