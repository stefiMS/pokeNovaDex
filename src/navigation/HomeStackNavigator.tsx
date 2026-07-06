// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { HomeScreen } from '../screens';

// const HomeStack = createNativeStackNavigator();
// const HomeStackNavigator = () => (
//   <HomeStack.Navigator
//     screenOptions={{
//       headerStyle: { backgroundColor: '#007AFF' },
//       headerTintColor: '#fff',
//       headerTitleStyle: { fontWeight: 'bold' },
//     }}
//   >
//     <HomeStack.Screen
//       name="HomeTab"
//       component={HomeScreen}
//       options={{ title: 'Pokédex' }}
//     />
//   </HomeStack.Navigator>
// );

// export default HomeStackNavigator;

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen, PokemonDetailScreen } from '../screens';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { COLORS } from '../theme';
import { HomeStackParamList } from '../types/pokemon';

const HomeStack = createNativeStackNavigator<HomeStackParamList>();

export const HomeStackNavigator = () => (
  <HomeStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#FFFFFF',
      },
      headerTintColor: '#000',
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
        // headerRight: () => (
        //   <Ionicons name="search-outline" size={28} color="#000" />
        // ),
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
