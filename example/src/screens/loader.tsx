import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import { ActivityIndicator, Text, useTheme } from 'react-native-paper';
import FixedContainer from '~/components/fixed-container';
import PrimaryText from '~/components/primary-text';
import { RootStackScreenProps } from '~/navigators/root-stack';
import { useRootStore } from '~/stores/store-setup';
import delay from '~/utils/delay';

const Loader = observer<RootStackScreenProps<'Loader'>>(({ navigation, route }) => {
  const { hydrate, hydrated, version } = useRootStore();
  const theme = useTheme();

  useEffect(() => {
    if (hydrated) {
      delay(route.params?.delay).then(() => navigation.replace('Welcome'));
    }
  }, [hydrated, navigation, route.params?.delay]);

  useEffect(() => {
    (async () => {
      try {
        if ((await RNBootSplash.getVisibilityStatus()) === 'visible') {
          await delay(500);
          await RNBootSplash.hide({ fade: true });
          hydrate();
        } else if (!hydrated) {
          hydrate();
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, [hydrate, hydrated]);

  return (
    <FixedContainer style={styles.center} edges={[]}>
      <Image style={styles.logo} source={require('~/assets/bootsplash_logo.png')} />
      <View style={styles.report}>
        <ActivityIndicator style={styles.progress} />
        <PrimaryText>{route.params?.text ?? 'Initializing'}</PrimaryText>
        <Text style={[styles.copy, { color: theme.colors.disabled }]}>
          Template Version: {version}
        </Text>
      </View>
    </FixedContainer>
  );
});

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    position: 'relative',
  },
  logo: {
    width: 200,
    height: 200,
  },
  report: {
    alignItems: 'center',
    position: 'absolute',
    bottom: 50,
  },
  progress: {
    marginVertical: 15,
  },
  copy: {
    marginTop: 75,
  },
});

export default Loader;
