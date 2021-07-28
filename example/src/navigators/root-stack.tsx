import React from 'react';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from 'react-native-screens/native-stack';
import { createNativeStackNavigator } from '~/compat/native-stack';
import Loader from '~/screens/loader';
import Welcome from '~/screens/welcome';

export type RootStackScreensParams = {
  Loader: undefined | { delay?: number; text?: string };
  Welcome: undefined;
};

export type RootStackScreens = keyof RootStackScreensParams;

export type RootStackScreenProps<T extends RootStackScreens> = NativeStackScreenProps<
  RootStackScreensParams,
  T
>;

export type UseRootStackNavigation<T extends RootStackScreens = 'Loader'> =
  NativeStackNavigationProp<RootStackScreensParams, T>;

const { Navigator, Screen } = createNativeStackNavigator<RootStackScreensParams>();

const RootStack = () => (
  <Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Screen name="Loader" component={Loader} />
    <Screen name="Welcome" component={Welcome} />
  </Navigator>
);

export default RootStack;
