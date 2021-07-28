import { KeyboardTypeOptions } from 'react-native';

export type AlertButtonStyle = 'default' | 'cancel' | 'destructive';

export interface AlertButton {
  text: string;
  onPress?: () => void;
  style?: AlertButtonStyle;
}

export interface AlertsOptions {
  cancelable?: boolean;
  onDismiss?: () => void;
  stacked?: boolean;
  uppercase?: boolean;
  autoFocus?: boolean;
  inputAppearance?: 'flat' | 'outlined';
  inputLabel?: string;
  loginInputLabel?: string;
  passwordInputLabel?: string;
  keyboardAppearance?: 'default' | 'dark' | 'light';
  width?: string | number;
  /** maxWidth is very useful for Web */
  maxWidth?: string | number;
}

export type RegularPromptType = 'plain-text' | 'secure-text';
export type LoginPromptType = 'login-password';
export type DefaultPromptType = 'default';
export type PromptType = RegularPromptType | LoginPromptType | DefaultPromptType;

export type RegularPromptCallback = (text: string) => void;
export type LoginPromptCallback = (text: { login: string; password: string }) => void;
export type DefaultPromptCallback = () => void;

export interface RegularPromptButton {
  text: string;
  onPress?: RegularPromptCallback;
  style?: AlertButtonStyle;
}

export interface LoginPromptButton {
  text: string;
  onPress?: LoginPromptCallback;
  style?: AlertButtonStyle;
}

type AlertAPI = (
  title: string,
  message?: string,
  button?: AlertButton[],
  options?: AlertsOptions
) => void;

type PromptAPI = {
  (
    title: string,
    message?: string,
    callbackOrButtons?: RegularPromptCallback | RegularPromptButton[],
    type?: RegularPromptType,
    defaultValue?: string,
    keyboardType?: KeyboardTypeOptions,
    options?: AlertsOptions
  ): void;
  (
    title: string,
    message?: string,
    callbackOrButtons?: LoginPromptCallback | LoginPromptButton[],
    type?: LoginPromptType,
    defaultValue?: string,
    keyboardType?: KeyboardTypeOptions,
    options?: AlertsOptions
  ): void;
  (
    title: string,
    message?: string,
    callbackOrButtons?: DefaultPromptCallback | AlertButton[],
    type?: DefaultPromptType,
    defaultValue?: string,
    keyboardType?: KeyboardTypeOptions,
    options?: AlertsOptions
  ): void;
};

export interface AlertsMethods {
  alert: AlertAPI;
  prompt: PromptAPI;
}

export interface AlertsState {
  /** For Business Logic */
  visible: boolean;
  /** For Alert API */
  title?: string;
  message?: string;
  button?: AlertButton[];
  prompt?: RegularPromptButton[];
  login?: LoginPromptButton[];
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  options: AlertsOptions;
}

type AlertsType = 'ALERT' | 'PROMPT' | 'DISMISS';

export interface AlertAction {
  type: AlertsType;
  payload: Partial<AlertsState>;
}
