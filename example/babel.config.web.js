const path = require('path');
const pak = require('../package.json');

const moduleResolver = [
  'module-resolver',
  {
    extensions: [
      '.js',
      '.jsx',
      '.ts',
      '.tsx',
      '.json',
      '.android.js',
      '.android.jsx',
      '.android.ts',
      '.android.tsx',
      '.ios.js',
      '.ios.jsx',
      '.ios.ts',
      '.ios.tsx',
      '.native.js',
      '.native.jsx',
      '.native.ts',
      '.native.tsx',
      '.web.js',
      '.web.jsx',
      '.web.ts',
      '.web.tsx',
    ],
    root: ['.'],
    alias: {
      [pak.name]: path.join(__dirname, 'package'),
      '~': './src',
    },
  },
];

module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  env: {
    production: {
      plugins: [
        moduleResolver,
        'transform-remove-console',
        'react-native-paper/babel',
        'react-native-reanimated/plugin',
        'react-native-web',
        'react-refresh/babel',
      ],
    },
    development: {
      plugins: [moduleResolver, 'react-native-reanimated/plugin', 'react-native-web'],
    },
  },
};
