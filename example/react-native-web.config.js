module.exports = {
  // React Native Vector Icon Fonts
  // Uncomment to add the font to bundle.
  iconFonts: [
    'MaterialCommunityIcons',
    // 'AntDesign',
    // 'Entypo',
    // 'EvilIcons',
    // 'Feather',
    // 'FontAwesome',
    // 'FontAwesome5_Brands',
    // 'FontAwesome5_Regular',
    // 'FontAwesome5_Solid',
    // 'Foundation',
    // 'Ionicons',
    // 'MaterialIcons',
    // 'SimpleLineIcons',
    // 'Octicons',
    // 'Zocial',
    // 'Fontisto',
  ],
  // Many OSS React Native packages are not compiled to ES5 before being
  // published. If you depend on uncompiled packages they may cause webpack
  // build  errors. To fix this webpack can be configured to compile to
  // the necessary `node_module`.
  needsTranspile: [
    // Used by TS Plus Template
    'react-native-reanimated',
    'react-native-vector-icons',
    // Additional Modules
    'react-native-paper-toast',
  ],
};
