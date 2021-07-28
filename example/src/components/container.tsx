import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Edge, SafeAreaView } from 'react-native-safe-area-context';

interface ContainerProps extends React.ComponentProps<typeof ScrollView> {
  edges?: Edge[];
  header?: React.ReactNode;
  mode?: 'padding' | 'margin';
}
const Container: React.FC<ContainerProps> = ({ children, edges, header, mode, ...rest }) => {
  return (
    <SafeAreaView edges={edges} mode={mode} style={styles.safeareaview}>
      {header}
      <ScrollView style={styles.scrollview} {...rest}>
        {children}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeareaview: {
    flex: 1,
  },
  scrollview: {
    flex: 1,
    flexBasis: 0, // React Native Web
  },
});

export default Container;
