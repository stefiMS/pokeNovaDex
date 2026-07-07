import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp } from '@react-navigation/native';

export type ProfileStackParamList = {
  TrainerStep1: undefined;
  TrainerStep2: undefined;
  TrainerSummary: undefined;
};

export type HomeStackParamList = {
  Home: undefined;
  PokemonDetail: { id: string };
};

export type TabParamList = {
  HomeTab: undefined;
  ProfileTab: undefined;
};
export type RootStackParamList = {
  MainTabs: undefined;
};

export type Step1ScreenNavigationProp = NativeStackNavigationProp<
  ProfileStackParamList,
  'TrainerStep1'
>;

export type Step2ScreenNavigationProp = NativeStackNavigationProp<
  ProfileStackParamList,
  'TrainerStep2'
>;

export type TrainerSummaryScreenNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<ProfileStackParamList, 'TrainerSummary'>,
  CompositeNavigationProp<
    BottomTabNavigationProp<TabParamList>,
    NativeStackNavigationProp<RootStackParamList>
  >
>;
