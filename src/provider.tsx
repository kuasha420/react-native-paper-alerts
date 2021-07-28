import React, { useCallback, useEffect, useMemo, useReducer, useRef, useState } from 'react';
import { KeyboardEventName, Platform } from 'react-native';
import { Animated, Easing, Keyboard, StyleSheet } from 'react-native';
import { Button, Dialog, Paragraph, Portal, TextInput, useTheme } from 'react-native-paper';
import AlertsContext from './context';
import reducer, { initialState } from './reducer';
import {
  AlertButton,
  AlertsMethods,
  DefaultPromptCallback,
  LoginPromptButton,
  LoginPromptCallback,
  RegularPromptButton,
  RegularPromptCallback,
} from './type';

const keyboardEvents: Record<'show' | 'hide', KeyboardEventName> = Platform.select({
  default: {
    show: 'keyboardDidShow',
    hide: 'keyboardDidHide',
  },
  ios: {
    show: 'keyboardWillShow',
    hide: 'keyboardWillHide',
  },
});

const AlertsProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [value, setValue] = useState('');
  const [password, setPassword] = useState('');

  const dismiss = useCallback(() => dispatch({ type: 'DISMISS', payload: {} }), []);

  const alerts: AlertsMethods = useMemo(
    () => ({
      alert: (title, message, button, options) =>
        dispatch({
          type: 'ALERT',
          payload: {
            title,
            message,
            button,
            ...(options && { options }),
            visible: true,
          },
        }),
      prompt: (title, message, callbackOrButtons, type, defaultValue, keyboardType, options) => {
        setValue(defaultValue ?? '');
        setPassword('');
        if (typeof callbackOrButtons === 'function') {
          switch (type) {
            case 'plain-text':
              return dispatch({
                type: 'PROMPT',
                payload: {
                  title,
                  message,
                  keyboardType,
                  prompt: [
                    { text: 'Ok', onPress: callbackOrButtons as RegularPromptCallback },
                    { text: 'Cancel', style: 'cancel' },
                  ],
                  ...(options && { options }),
                  visible: true,
                },
              });

            case 'secure-text':
              return dispatch({
                type: 'PROMPT',
                payload: {
                  title,
                  message,
                  keyboardType,
                  secureTextEntry: true,
                  prompt: [
                    { text: 'Ok', onPress: callbackOrButtons as RegularPromptCallback },
                    { text: 'Cancel', style: 'cancel' },
                  ],
                  ...(options && { options }),
                  visible: true,
                },
              });

            case 'login-password':
              return dispatch({
                type: 'PROMPT',
                payload: {
                  title,
                  message,
                  keyboardType,
                  login: [
                    { text: 'Ok', onPress: callbackOrButtons as LoginPromptCallback },
                    { text: 'Cancel', style: 'cancel' },
                  ],
                  ...(options && { options }),
                  visible: true,
                },
              });

            case 'default':
              return dispatch({
                type: 'ALERT',
                payload: {
                  title,
                  message,
                  button: [{ text: 'Ok', onPress: callbackOrButtons as DefaultPromptCallback }],
                  ...(options && { options }),
                  visible: true,
                },
              });

            default:
              dispatch({
                type: 'PROMPT',
                payload: {
                  title,
                  message,
                  keyboardType,
                  prompt: [
                    { text: 'Ok', onPress: callbackOrButtons as RegularPromptCallback },
                    { text: 'Cancel', style: 'cancel' },
                  ],
                  ...(options && { options }),
                  visible: true,
                },
              });
          }
        } else if (typeof callbackOrButtons === 'undefined') {
          switch (type) {
            case 'plain-text':
              return dispatch({
                type: 'PROMPT',
                payload: {
                  title,
                  message,
                  keyboardType,
                  prompt: [{ text: 'Ok' }, { text: 'Cancel', style: 'cancel' }],
                  ...(options && { options }),
                  visible: true,
                },
              });

            case 'secure-text':
              return dispatch({
                type: 'PROMPT',
                payload: {
                  title,
                  message,
                  keyboardType,
                  secureTextEntry: true,
                  prompt: [{ text: 'Ok' }, { text: 'Cancel', style: 'cancel' }],
                  ...(options && { options }),
                  visible: true,
                },
              });

            case 'login-password':
              return dispatch({
                type: 'PROMPT',
                payload: {
                  title,
                  message,
                  keyboardType,
                  login: [{ text: 'Ok' }, { text: 'Cancel', style: 'cancel' }],
                  ...(options && { options }),
                  visible: true,
                },
              });

            case 'default':
              return dispatch({
                type: 'ALERT',
                payload: {
                  title,
                  message,
                  button: [{ text: 'Ok' }],
                  ...(options && { options }),
                  visible: true,
                },
              });

            default:
              dispatch({
                type: 'PROMPT',
                payload: {
                  title,
                  message,
                  keyboardType,
                  prompt: [{ text: 'Ok' }, { text: 'Cancel', style: 'cancel' }],
                  ...(options && { options }),
                  visible: true,
                },
              });
          }
        } else {
          switch (type) {
            case 'plain-text':
              return dispatch({
                type: 'PROMPT',
                payload: {
                  title,
                  message,
                  keyboardType,
                  prompt: callbackOrButtons as RegularPromptButton[],
                  ...(options && { options }),
                  visible: true,
                },
              });

            case 'secure-text':
              return dispatch({
                type: 'PROMPT',
                payload: {
                  title,
                  message,
                  keyboardType,
                  secureTextEntry: true,
                  prompt: callbackOrButtons as RegularPromptButton[],
                  ...(options && { options }),
                  visible: true,
                },
              });

            case 'login-password':
              return dispatch({
                type: 'PROMPT',
                payload: {
                  title,
                  message,
                  keyboardType,
                  login: callbackOrButtons as LoginPromptButton[],
                  ...(options && { options }),
                  visible: true,
                },
              });

            case 'default':
              return dispatch({
                type: 'ALERT',
                payload: {
                  title,
                  message,
                  button: callbackOrButtons as AlertButton[],
                  ...(options && { options }),
                  visible: true,
                },
              });

            default:
              dispatch({
                type: 'PROMPT',
                payload: {
                  title,
                  message,
                  keyboardType,
                  prompt: callbackOrButtons as RegularPromptButton[],
                  ...(options && { options }),
                  visible: true,
                },
              });
          }
        }
      },
    }),
    []
  );

  const theme = useTheme();

  const translateY = useRef(new Animated.Value(0));

  const onKeyboardShown = useCallback(
    (height: number) =>
      Animated.timing(translateY.current, {
        toValue: -height,
        duration: 250,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start(),
    []
  );

  const onKeyboardHidden = useCallback(
    () =>
      Animated.timing(translateY.current, {
        toValue: 0,
        duration: 250,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start(),
    []
  );

  useEffect(() => {
    if (state.visible) {
      Keyboard.addListener(keyboardEvents.show, (e) =>
        onKeyboardShown(e.endCoordinates.height / 2)
      );
      Keyboard.addListener(keyboardEvents.hide, () => onKeyboardHidden());
    }
    return () => {
      onKeyboardHidden();
      Keyboard.removeAllListeners(keyboardEvents.show);
      Keyboard.removeAllListeners(keyboardEvents.hide);
    };
  }, [onKeyboardHidden, onKeyboardShown, state.visible]);

  return (
    <AlertsContext.Provider value={alerts}>
      {children}
      <Portal>
        <Animated.View
          pointerEvents="box-none"
          style={[styles.animate, { transform: [{ translateY: translateY.current }] }]}
        >
          <Dialog
            visible={state.visible}
            dismissable={state.options.cancelable}
            onDismiss={() => {
              if (state.options.cancelable) {
                state.options.onDismiss?.();
              }
              dismiss();
            }}
            style={[
              styles.web,
              {
                ...(state.options.width && {
                  width: state.options.width,
                  alignSelf: 'center',
                  maxWidth: state.options.width,
                }),
              },
              {
                ...(state.options.maxWidth && {
                  maxWidth: state.options.width ?? state.options.maxWidth,
                }),
              },
            ]}
          >
            {state.title ? <Dialog.Title>{state.title}</Dialog.Title> : null}
            {state.message ? (
              <Dialog.Content>
                <Paragraph>{state.message}</Paragraph>
              </Dialog.Content>
            ) : null}
            {state.prompt ? (
              <Dialog.Content>
                <TextInput
                  autoFocus={state.options.autoFocus}
                  mode={state.options.inputAppearance}
                  label={
                    state.options.inputLabel ?? (state.secureTextEntry ? 'Password' : undefined)
                  }
                  value={value}
                  onChangeText={setValue}
                  secureTextEntry={state.secureTextEntry}
                  keyboardAppearance={state.options.keyboardAppearance}
                  keyboardType={state.keyboardType}
                />
              </Dialog.Content>
            ) : state.login ? (
              <Dialog.Content>
                <TextInput
                  autoFocus={state.options.autoFocus}
                  mode={state.options.inputAppearance}
                  label={state.options.loginInputLabel ?? 'Login'}
                  value={value}
                  onChangeText={setValue}
                  keyboardAppearance={state.options.keyboardAppearance}
                  keyboardType={state.keyboardType}
                  style={styles.login}
                />
                <TextInput
                  mode={state.options.inputAppearance}
                  label={state.options.passwordInputLabel ?? 'Password'}
                  value={password}
                  onChangeText={setPassword}
                  keyboardAppearance={state.options.keyboardAppearance}
                  keyboardType={state.keyboardType}
                  secureTextEntry={true}
                />
              </Dialog.Content>
            ) : null}
            {state.button ? (
              <Dialog.Actions style={state.options.stacked && styles.stacked}>
                {state.button.map((btn) => (
                  <Button
                    key={btn.text}
                    onPress={() => {
                      btn.onPress?.();
                      dismiss();
                    }}
                    color={
                      btn.style === 'destructive'
                        ? theme.colors.error
                        : btn.style === 'cancel'
                        ? theme.colors.text
                        : theme.colors.primary
                    }
                    uppercase={state.options.uppercase}
                  >
                    {btn.text}
                  </Button>
                ))}
              </Dialog.Actions>
            ) : state.prompt ? (
              <Dialog.Actions style={state.options.stacked && styles.stacked}>
                {state.prompt.map((btn) => (
                  <Button
                    key={btn.text}
                    onPress={() => {
                      btn.onPress?.(value);
                      dismiss();
                    }}
                    color={
                      btn.style === 'destructive'
                        ? theme.colors.error
                        : btn.style === 'cancel'
                        ? theme.colors.text
                        : theme.colors.primary
                    }
                    uppercase={state.options.uppercase}
                  >
                    {btn.text}
                  </Button>
                ))}
              </Dialog.Actions>
            ) : state.login ? (
              <Dialog.Actions style={state.options.stacked && styles.stacked}>
                {state.login.map((btn) => (
                  <Button
                    key={btn.text}
                    onPress={() => {
                      btn.onPress?.({ login: value, password });
                      dismiss();
                    }}
                    color={
                      btn.style === 'destructive'
                        ? theme.colors.error
                        : btn.style === 'cancel'
                        ? theme.colors.text
                        : theme.colors.primary
                    }
                    uppercase={state.options.uppercase}
                  >
                    {btn.text}
                  </Button>
                ))}
              </Dialog.Actions>
            ) : (
              <Dialog.Actions>
                <Button onPress={dismiss} uppercase={state.options.uppercase}>
                  Ok
                </Button>
              </Dialog.Actions>
            )}
          </Dialog>
        </Animated.View>
      </Portal>
    </AlertsContext.Provider>
  );
};

const styles = StyleSheet.create({
  stacked: {
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  animate: {
    flex: 1,
    marginVertical: -300,
  },
  login: {
    marginBottom: 16,
  },
  /** This is ugly and we should do better */
  web:
    Platform.OS === 'web'
      ? {
          maxWidth: 560,
          alignSelf: 'center',
        }
      : {},
});

export default AlertsProvider;
