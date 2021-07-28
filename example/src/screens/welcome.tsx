import { observer } from 'mobx-react-lite';
import React from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import {
  Button,
  Divider,
  Headline,
  Paragraph,
  Text,
  ToggleButton,
  useTheme,
} from 'react-native-paper';
import { useToast } from 'react-native-paper-toast';
import { Edge } from 'react-native-safe-area-context';
import Container from '~/components/container';
import CustomHeader from '~/components/custom-header';
import useIsDarkTheme from '~/hooks/use-is-dark-theme';
import { RootStackScreenProps } from '~/navigators/root-stack';
import { useAlerts } from 'react-native-paper-alerts';
import { useRootStore } from '~/stores/store-setup';

const edges: Edge[] = ['right', 'bottom', 'left'];

const Welcome = observer<RootStackScreenProps<'Welcome'>>(() => {
  const { setUserColorScheme, currentColorScheme } = useRootStore();

  const theme = useTheme();

  const [isDark, isSystem] = useIsDarkTheme();

  const toast = useToast();
  const alerts = useAlerts();

  const simpleNativeAlert = () => Alert.alert('Simple Alert', 'This is a simple alert dialog');

  const simpleAlert = () => alerts.alert('Simple Alert', 'This is a simple alert dialog');

  const multipleBtnNativeAlert = () =>
    Alert.alert(
      'Alert with Multiple Buttons',
      'This is a alert dialog with multiple button and different styles.',
      [
        {
          text: 'Agree',
        },
        {
          text: 'Disagree',
          style: 'cancel',
        },
        {
          text: 'Not Sure',
          style: 'destructive',
        },
      ]
    );

  const multipleBtnAlert = () =>
    alerts.alert(
      'Alert with Multiple Buttons',
      'This is a alert dialog with multiple button and different styles.',
      [
        {
          text: 'Agree',
        },
        {
          text: 'Disagree',
          style: 'cancel',
        },
        {
          text: 'Not Sure',
          style: 'destructive',
        },
      ]
    );

  const stackedBtnAlert = () =>
    alerts.alert(
      'Alert with Stacked Buttons',
      'This is useful for buttons with longer texts.',
      [
        {
          text: 'Yes, I want to sign up',
        },
        {
          text: 'No, remind me later',
        },
      ],
      {
        stacked: true,
      }
    );

  const nonUpercaseAlert = () =>
    alerts.alert(
      'Alert with Multiple Buttons',
      'This is a alert dialog with multiple button and different styles.',
      [
        {
          text: 'Agree',
        },
        {
          text: 'Disagree',
          style: 'cancel',
        },
        {
          text: 'Not Sure',
          style: 'destructive',
        },
      ],
      {
        uppercase: false,
      }
    );

  const simpleNativePrompt = () =>
    Alert.prompt('Simple Prompt', 'This is a simple prompt dialog', (message) => {
      toast.show({ message });
    });

  const simplePrompt = () =>
    alerts.prompt('Simple Prompt', 'This is a simple prompt dialog', (message) => {
      toast.show({ message });
    });

  const promptWithDefaultValue = () =>
    alerts.prompt(
      'Prompt with Default Value',
      'This is a simple prompt dialog with default value',
      (message) => {
        toast.show({ message });
      },
      'plain-text',
      '80'
    );

  const promptWithLabel = () =>
    alerts.prompt(
      'Prompt with Label',
      'This is a simple prompt dialog with custom input label',
      (message) => {
        toast.show({ message });
      },
      'plain-text',
      '',
      'default',
      { inputLabel: 'Enter Coupon' }
    );

  const promptInputAppearance = () =>
    alerts.prompt(
      'Prompt with Outlined Input',
      'Outlined Input Prompt',
      (message) => {
        toast.show({ message });
      },
      'plain-text',
      '',
      'default',
      { inputLabel: 'Enter Coupon', inputAppearance: 'outlined' }
    );

  const promptWithCustomButtons = () =>
    alerts.prompt(
      'Prompt With Custom Buttons',
      'This is a simple prompt dialog With Custom Buttons',
      [
        {
          text: 'Enter Game',
          onPress: (message) => {
            toast.show({ message });
          },
        },
        {
          text: 'Exit',
          style: 'cancel',
        },
      ],
      'plain-text',
      '',
      'default',
      { inputLabel: 'Enter Coupon', inputAppearance: 'outlined' }
    );

  const promptAutoFocus = () =>
    alerts.prompt(
      'Autofocus Enabled Prompt',
      'This is a simple prompt dialog with the focus on Text Input',
      (message) => {
        toast.show({ message });
      },
      'plain-text',
      '',
      'default',
      { inputLabel: 'Enter Coupon', inputAppearance: 'outlined', autoFocus: true }
    );

  const secureNativePrompt = () =>
    Alert.prompt(
      'Secure Prompt',
      'This is a secure prompt dialog',
      (message) => {
        toast.show({ message });
      },
      'secure-text'
    );

  const securePrompt = () =>
    alerts.prompt(
      'Secure Prompt',
      'This is a secure prompt dialog',
      (message) => {
        toast.show({ message });
      },
      'secure-text'
    );

  const securePromptCustomLabel = () =>
    alerts.prompt(
      'Secure Prompt',
      'This is a secure prompt dialog with custom label',
      (message) => {
        toast.show({ message });
      },
      'secure-text',
      '',
      'default',
      {
        inputLabel: 'Enter Your Pin Number',
      }
    );

  const securePromptCustomButtons = () =>
    alerts.prompt(
      'Secure Prompt',
      'This is a secure prompt dialog with custom buttons',
      [
        {
          text: 'Enter Game',
          onPress: (message) => {
            toast.show({ message });
          },
        },
        {
          text: 'Exit',
          style: 'cancel',
        },
      ],
      'secure-text',
      '',
      'default',
      {
        inputLabel: 'Enter Your Pin Number',
      }
    );

  const loginNativePrompt = () =>
    Alert.prompt(
      'Login Prompt',
      'This is a login prompt dialog',
      (message: any) => {
        toast.show({ message: `Login: ${message.login}, Password: ${message.password}` });
      },
      'login-password'
    );

  const loginPrompt = () =>
    alerts.prompt(
      'Login Prompt',
      'This is a login prompt dialog',
      (message) => {
        toast.show({ message: `Login: ${message.login}, Password: ${message.password}` });
      },
      'login-password'
    );

  const loginCustomLabelPrompt = () =>
    alerts.prompt(
      'Login Prompt',
      'This is a secure prompt dialog with custom labels',
      (message) => {
        toast.show({ message: `Login: ${message.login}, Password: ${message.password}` });
      },
      'login-password',
      '',
      'default',
      {
        loginInputLabel: 'Your Username',
        passwordInputLabel: 'Your Password',
      }
    );

  const loginAppearancePrompt = () =>
    alerts.prompt(
      'Login Prompt',
      'This is a login prompt dialog with custom appearance',
      (message) => {
        toast.show({ message: `Login: ${message.login}, Password: ${message.password}` });
      },
      'login-password',
      '',
      'default',
      {
        loginInputLabel: 'Your Username',
        passwordInputLabel: 'Your Password',
        inputAppearance: 'outlined',
      }
    );

  const loginPromptCustomButtons = () =>
    alerts.prompt(
      'Login Prompt',
      'This is a login prompt dialog with custom buttons',
      [
        {
          text: 'Enter Game',
          onPress: (message) => {
            toast.show({ message: `Login: ${message.login}, Password: ${message.password}` });
          },
        },
        {
          text: 'Exit',
          style: 'cancel',
        },
      ],
      'login-password',
      '',
      'default',
      {
        loginInputLabel: 'Your Username',
        passwordInputLabel: 'Your Password',
        inputAppearance: 'outlined',
      }
    );

  const defaultNativePrompt = () =>
    Alert.prompt(
      'Simple Prompt',
      'This is a simple prompt dialog',
      () => {
        toast.show({
          message: 'Default Prompt Works Like an Alert and passes no params to the callback. ',
        });
      },
      'default'
    );

  const defaultPrompt = () =>
    alerts.prompt(
      'Simple Prompt',
      'This is a simple prompt dialog',
      () => {
        toast.show({
          message: 'Default Prompt Works Like an Alert and passes no params to the callback. ',
        });
      },
      'default'
    );

  return (
    <Container
      edges={edges}
      header={<CustomHeader title="Welcome" subtitle="src/screens/welcome.tsx" />}
    >
      <View style={styles.container}>
        <Headline style={styles.headline}>React Native Paper Alerts</Headline>
        <Paragraph style={styles.pitch}>
          Click on the following buttons to open different types of alerts and prompts
        </Paragraph>
        <Button onPress={simpleNativeAlert} mode="contained">
          Simple Native Alert
        </Button>
        <Button onPress={simpleAlert}>Simple Alert</Button>
        <Button onPress={multipleBtnAlert}>Alert With Multiple Buttons</Button>
        <Button onPress={multipleBtnNativeAlert} mode="contained">
          Native Alert With Multiple Buttons
        </Button>
        <Button onPress={stackedBtnAlert}>Alert With Stacked Buttons</Button>
        <Button onPress={nonUpercaseAlert}>Alert With Non Uppercase Buttons</Button>
        <Divider />
        <Button onPress={simpleNativePrompt} mode="contained">
          Simple Native Prompt (IOS Only)
        </Button>
        <Button onPress={simplePrompt}>Simple Prompt</Button>
        <Button onPress={promptWithDefaultValue}>Simple Prompt with Default Value</Button>
        <Button onPress={promptWithLabel}>Simple Prompt Input Label</Button>
        <Button onPress={promptInputAppearance}>Simple Prompt Input Appearance</Button>
        <Button onPress={promptAutoFocus}>Simple Prompt Auto Focus</Button>
        <Button onPress={promptWithCustomButtons}>Simple Prompt Custom Buttons</Button>
        <Button onPress={secureNativePrompt} mode="contained">
          Secure Native Prompt (IOS Only)
        </Button>
        <Button onPress={securePrompt}>Secure Prompt</Button>
        <Button onPress={securePromptCustomLabel}>Secure Prompt Custom Label</Button>
        <Button onPress={securePromptCustomButtons}>Secure Prompt Custom Buttons</Button>
        <Button onPress={loginNativePrompt} mode="contained">
          Login Native Prompt (IOS Only)
        </Button>
        <Button onPress={loginPrompt}>Login Prompt</Button>
        <Button onPress={loginPromptCustomButtons}>Login Prompt Custom Labels</Button>
        <Button onPress={loginCustomLabelPrompt}>Login Prompt Custom Buttons</Button>
        <Button onPress={loginAppearancePrompt}>Login Prompt Outlined</Button>
        <Button onPress={defaultNativePrompt} mode="contained">
          Default Native Prompt (IOS Only)
        </Button>
        <Button onPress={defaultPrompt}>Default Prompt</Button>
        <View style={styles.theme}>
          <Text>Currently using: {isDark ? 'Dark' : 'Default'} Theme</Text>
          <Text style={{ color: theme.colors.disabled }}>
            Theme is set by {isSystem ? 'System' : 'User'}
          </Text>
        </View>
        <ToggleButton.Row
          style={styles.toggle}
          onValueChange={(value) => setUserColorScheme(value as any)}
          value={currentColorScheme}
        >
          <ToggleButton icon="cog" value="auto" />
          <ToggleButton icon="weather-sunny" value="light" />
          <ToggleButton icon="weather-night" value="dark" />
        </ToggleButton.Row>
      </View>
    </Container>
  );
});

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
  },
  logo: {
    marginTop: 15,
    alignSelf: 'center',
    height: 260,
  },
  reactLogo: {
    height: 200,
    width: 200,
  },
  templateLogo: {
    height: 200,
    width: 200,
    position: 'absolute',
  },
  headline: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  pitch: {
    marginBottom: 10,
  },
  version: {
    marginVertical: 10,
    alignItems: 'center',
  },
  theme: {
    marginVertical: 20,
    alignItems: 'center',
  },
  toggle: {
    marginBottom: 10,
    justifyContent: 'center',
  },
});

export default Welcome;
