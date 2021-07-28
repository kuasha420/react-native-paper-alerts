import { DarkTheme as RNDarkTheme, Theme } from '@react-navigation/native';
import { DarkTheme as PaperDarkTheme } from 'react-native-paper';

const DarkTheme: Theme & ReactNativePaper.Theme = {
  ...RNDarkTheme,
  ...PaperDarkTheme,
  colors: {
    ...RNDarkTheme.colors,
    ...PaperDarkTheme.colors,
  },
};

export default DarkTheme;
