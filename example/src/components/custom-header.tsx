import React from 'react';
import { StatusBar, StatusBarStyle } from 'react-native';
import { Appbar } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface CustomHeaderProps {
  title: string;
  subtitle?: string;
  statusBarStyle?: StatusBarStyle;
  onBackPress?: () => void;
  onLeftMenuPress?: () => void;
  onRightMenuPress?: () => void;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({
  title,
  subtitle,
  statusBarStyle = 'light-content',
  onBackPress,
  onLeftMenuPress,
  onRightMenuPress,
}) => {
  const { top } = useSafeAreaInsets();
  return (
    <Appbar.Header statusBarHeight={top}>
      <StatusBar barStyle={statusBarStyle} backgroundColor="transparent" />
      {onLeftMenuPress ? <Appbar.Action icon="menu" onPress={onLeftMenuPress} /> : null}
      {onBackPress ? <Appbar.BackAction onPress={onBackPress} /> : null}
      <Appbar.Content title={title} subtitle={subtitle} />
      {onRightMenuPress ? <Appbar.Action icon="dots-vertical" onPress={onRightMenuPress} /> : null}
    </Appbar.Header>
  );
};

export default CustomHeader;
