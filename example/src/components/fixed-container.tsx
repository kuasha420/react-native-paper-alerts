import React from 'react';
import { StyleSheet } from 'react-native';
import { NativeSafeAreaViewProps, SafeAreaView } from 'react-native-safe-area-context';

const FixedContainer: React.FC<NativeSafeAreaViewProps> = ({ children, style, ...rest }) => {
  return (
    <SafeAreaView style={[styles.safeareaview, style]} {...rest}>
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeareaview: {
    flex: 1,
  },
});

export default FixedContainer;
