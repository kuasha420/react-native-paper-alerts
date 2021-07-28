import React from 'react';
import { Text, useTheme } from 'react-native-paper';

const PrimaryText: React.FC<React.ComponentProps<typeof Text>> = ({ children, style, ...rest }) => {
  const theme = useTheme();
  return (
    <Text style={[{ color: theme.colors.primary }, style]} {...rest}>
      {children}
    </Text>
  );
};

export default PrimaryText;
