import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

type Props = {
  route: string;
  color: string;
  size: number;
  focused: boolean;
};

export const TabBarIcon = ({ route, color, size, focused }: Props) => {
  switch (route) {
    case 'HomeTab':
      return (
        <MaterialCommunityIcons name="pokeball" size={size} color={color} />
      );

    case 'ProfileTab':
      return (
        <Ionicons
          name={focused ? 'person' : 'person-outline'}
          size={size}
          color={color}
        />
      );

    default:
      return null;
  }
};
