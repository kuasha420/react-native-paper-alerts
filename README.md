# React Native Paper Alerts

Cross Platform Material Alert and Prompt for React Native. It tries to follow the API and function signature of React Native's built-in Alert Module and works on Android, IOS and Web.

| Color Scheme | Simple Alert                          | Alert With Multiple Butons            | Alert With Stacked Butons             | Simple Prompt                         | Simple Prompt (Focused)               | Prompt With Outlined Input            | Prompt With Label                     | Prompt With Label (Focused)           | Login Prompt                          |
| ------------ | ------------------------------------- | ------------------------------------- | ------------------------------------- | ------------------------------------- | ------------------------------------- | ------------------------------------- | ------------------------------------- | ------------------------------------- | ------------------------------------- |
| Light        | ![SC](/screenshots/sc1.png?raw=true)  | ![SC](/screenshots/sc2.png?raw=true)  | ![SC](/screenshots/sc3.png?raw=true)  | ![SC](/screenshots/sc4.png?raw=true)  | ![SC](/screenshots/sc5.png?raw=true)  | ![SC](/screenshots/sc6.png?raw=true)  | ![SC](/screenshots/sc7.png?raw=true)  | ![SC](/screenshots/sc8.png?raw=true)  | ![SC](/screenshots/sc9.png?raw=true)  |
| Dark         | ![SC](/screenshots/sc10.png?raw=true) | ![SC](/screenshots/sc11.png?raw=true) | ![SC](/screenshots/sc12.png?raw=true) | ![SC](/screenshots/sc13.png?raw=true) | ![SC](/screenshots/sc14.png?raw=true) | ![SC](/screenshots/sc15.png?raw=true) | ![SC](/screenshots/sc16.png?raw=true) | ![SC](/screenshots/sc17.png?raw=true) | ![SC](/screenshots/sc18.png?raw=true) |

## Installation

```sh
yarn add react-native-paper-alerts
```

This library depends on React Native Paper. Please install it as well if you haven't already.

```sh
yarn add react-native-paper
```

## Usage

1. Wrap your component tree with AlertsProvider. This should be after SafeAreaProvider & PaperProvider!

```tsx
// App.tsx
import React from 'react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { initialWindowMetrics, SafeAreaProvider } from 'react-native-safe-area-context';
import { AlertsProvider } from 'react-native-paper-alerts';
import Application from './application';

export default function App() {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <PaperProvider theme={DefaultTheme}>
        <AlertsProvider>
          <Application />
        </AlertsProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
```

2. Import the `useAlerts` hook from the library. Calling it will return you an object with two functions `alert` and `prompt` to open an alert or a prompt dialog respectively. The function signatures are compatible with the `Alert.alert` and `Alert.prompt` from react-native and adds additional features on top of that.

```tsx
import { useAlerts } from 'react-native-paper-alerts';

export const Screen: React.FC<Props> = (props) => {
  const alerts = useAlerts();

  // You can now alerts methods from handler functions, effects or onPress props!

  // Call from handler function
  const simpleAlert = () => alerts.alert('Simple Alert', 'This is a simple alert dialog');

  const simplePrompt = () =>
    alerts.prompt('Simple Prompt', 'This is a simple prompt dialog', (message) => {
      toast.show({ message });
    });

  // Call from Effects
  useEffect(() => {
    login(username, password).then((v) =>
      alerts.alert('Simple Alert', 'This is a simple alert dialog')
    );
  });

  return (
    <Surface>
      <Button onPress={simpleAlert}>Simple Alert</Button>
      <Button onPress={simplePrompt}>Simple Prompt</Button>
    </Surface>
  );
};
```

For more examples, see the [example project](example/src/screens/welcome.tsx)

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
