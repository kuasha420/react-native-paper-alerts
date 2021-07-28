import { AppRegistry } from 'react-native';
import appInfo from './app.json';
import App from './src';
import { iconFonts } from './react-native-web.config';

const IconsCSS = iconFonts
  .map(
    (font) => `
@font-face {
  font-family: '${font}';
  src: url(${require(`react-native-vector-icons/Fonts/${font}.ttf`)}) format('truetype');
}
`
  )
  .join('\n');

const importIconsCSS = () => {
  const newStyle = document.createElement('style');
  newStyle.appendChild(document.createTextNode(IconsCSS));
  document.head.appendChild(newStyle);
};

AppRegistry.registerComponent(appInfo.name, () => App);

importIconsCSS();

AppRegistry.runApplication(appInfo.name, {
  rootTag: document.getElementById('root'),
});
