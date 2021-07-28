import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, Drawer, Text, ToggleButton } from 'react-native-paper';
import FixedContainer from '~/components/fixed-container';
import useIsDarkTheme from '~/hooks/use-is-dark-theme';
import { useRootStore } from '~/stores/store-setup';

const iconProps = {
  color: '',
  size: 0,
  focused: false,
};

const CustomDrawer = observer<DrawerContentComponentProps>((props) => {
  const { setUserColorScheme, currentColorScheme } = useRootStore();
  const [isDark, isSystem] = useIsDarkTheme();
  return (
    <FixedContainer style={styles.drawer} edges={['top', 'bottom', 'left']}>
      <Drawer.Section style={styles.container}>
        <Avatar.Image
          style={styles.avatar}
          size={48}
          source={require('~/assets/bootsplash_logo.png')}
        />
        <View style={styles.contents}>
          <Text style={styles.title}>Welcome</Text>
          <Text style={styles.title2}>src/components/custom-drawer.tsx</Text>
        </View>
      </Drawer.Section>
      <Drawer.Section>
        {props.state.routes.map((route, i) => (
          <Drawer.Item
            key={route.key}
            active={props.state.index === i}
            label={props.descriptors[route.key].options.title || route.name}
            icon={props.descriptors[route.key].options.drawerIcon?.(iconProps) ?? undefined}
            onPress={() => props.navigation.navigate(route.name)}
          />
        ))}
      </Drawer.Section>
      <Drawer.Section style={styles.footer}>
        <ToggleButton.Row
          style={styles.toggle}
          onValueChange={(value) => setUserColorScheme(value as any)}
          value={currentColorScheme}
        >
          <ToggleButton style={styles.togglebtn} icon="cog" value="auto" />
          <ToggleButton style={styles.togglebtn} icon="weather-sunny" value="light" />
          <ToggleButton style={styles.togglebtn} icon="weather-night" value="dark" />
          <Text style={styles.theme}>
            {isDark ? 'Dark' : 'Light'} ({isSystem ? 'System' : 'User'})
          </Text>
        </ToggleButton.Row>
      </Drawer.Section>
    </FixedContainer>
  );
});

const styles = StyleSheet.create({
  drawer: {
    flex: 1,
  },
  container: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    paddingVertical: 10,
  },
  contents: {
    marginLeft: 10,
  },
  avatar: {
    backgroundColor: 'transparent',
  },
  title: {
    marginLeft: 15,
    fontSize: 24,
    fontWeight: 'bold',
  },
  title2: {
    marginLeft: 15,
    fontSize: 11,
  },
  footer: {
    marginTop: 'auto',
  },
  toggle: {
    alignItems: 'center',
    marginLeft: 9,
  },
  togglebtn: {
    borderWidth: 0,
  },
  theme: {
    marginLeft: 9,
  },
});

export default CustomDrawer;
