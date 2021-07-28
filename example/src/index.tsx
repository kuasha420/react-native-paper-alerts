import {
  LinkingOptions,
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { Linking, Platform } from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import { changeBarColors } from 'react-native-immersive-bars';
import { Provider as PaperProvider } from 'react-native-paper';
import { ToastProvider } from 'react-native-paper-toast';
import { initialWindowMetrics, SafeAreaProvider } from 'react-native-safe-area-context';
import useIsDarkTheme from '~/hooks/use-is-dark-theme';
import RootStack from '~/navigators/root-stack';
import { AlertsProvider } from 'react-native-paper-alerts';
import { RootStoreProvider, useRootStore } from '~/stores/store-setup';
import DarkTheme from '~/themes/dark-theme';
import DefaultTheme from '~/themes/default-theme';
import delay from '~/utils/delay';

const linking: LinkingOptions = {
  prefixes: [
    /* your linking prefixes */
    'paperalerts://',
    'https://www.paperalerts.com',
  ],
  config: {
    /* configuration for matching screens with paths */
    screens: {
      initialRouteName: 'Loader',
      Welcome: 'welcome',
      Loader: {
        path: 'loader/:delay?/:text?',
        parse: {
          delay: (ms) => Number(ms),
          text: (text) => decodeURIComponent(text),
        },
        stringify: {
          delay: (ms) => String(ms),
          text: (text) => encodeURIComponent(text),
        },
      },
      Drawer: {
        path: 'drawer',
        screens: {
          Welcome: 'welcome',
          BottomTab: {
            path: 'bottom-tab',
            screens: {
              Home: 'home',
              Details: 'details',
            },
          },
          TopTab: {
            path: 'top-tab',
            screens: {
              One: 'one',
              Two: 'two',
              Three: 'three',
            },
          },
        },
      },
    },
  },
};

const Main = observer(() => {
  const { hydrate } = useRootStore();
  const nav = useRef<NavigationContainerRef>(null);
  const [isDark] = useIsDarkTheme();
  const theme = useMemo(() => {
    if (isDark) {
      return DarkTheme;
    }
    return DefaultTheme;
  }, [isDark]);

  useEffect(() => {
    if (Platform.OS === 'android') {
      changeBarColors(isDark);
    }
  }, [isDark]);

  const onReady = useCallback(async () => {
    try {
      const uri = await Linking.getInitialURL();
      if (uri) {
        await delay(500);
        await hydrate();
        RNBootSplash.hide({ fade: true });
      }
    } catch (error) {
      console.error(error);
    }
  }, [hydrate]);

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <PaperProvider theme={theme}>
        <ToastProvider>
          <AlertsProvider>
            <NavigationContainer linking={linking} theme={theme} ref={nav} onReady={onReady}>
              <RootStack />
            </NavigationContainer>
          </AlertsProvider>
        </ToastProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
});

const App = () => (
  <RootStoreProvider>
    <Main />
  </RootStoreProvider>
);

export default App;
