import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import webConfig from './react-native-web.config';
import packageJSON from './package.json';
import babelConfig from './babel.config.web';

let { homepage } = packageJSON;
let publicPath = '/';
if (homepage) {
  const stubDomain = 'https://create-react-app.dev';

  homepage = homepage.endsWith('/') ? homepage : homepage + '/';

  const validHomepagePathname = new URL(homepage, stubDomain).pathname;
  publicPath = homepage.startsWith('.') ? homepage : validHomepagePathname;
}

const config: webpack.Configuration = {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, 'web'),
    historyApiFallback: true,
    hot: true,
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: 'web',
          globOptions: {
            ignore: ['**/index.html'],
          },
        },
      ],
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'web', 'index.html'),
    }),
    new ReactRefreshWebpackPlugin(),
  ],

  entry: [
    // your web-specific entry file
    path.resolve(__dirname, 'index.web.js'),
  ],

  output: {
    filename: 'bundle.js',
    publicPath,
    path: path.resolve(__dirname, 'public'),
    clean: true,
  },

  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        include: [
          path.resolve(__dirname, 'index.web.js'),
          path.resolve(__dirname, 'src'),
          ...webConfig.needsTranspile.map((mod) => path.resolve(__dirname, 'node_modules', mod)),
        ],
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            ...babelConfig,
          },
        },
      },
      {
        test: /\.(gif|jpe?g|png|svg|ttf)$/,
        type: 'asset',
        generator: {
          filename: 'assets/[name][ext]',
        },
      },
    ],
  },

  resolve: {
    alias: {
      process: 'process/browser',
      'react-native/Libraries/ReactNative/AppContainer':
        'react-native-web/dist/exports/AppRegistry/AppContainer',
      'react-native/Libraries/Components/View/ReactNativeStyleAttributes.js':
        'react-native-web/dist/exports/AppRegistry/AppContainer',
      'react-native$': 'react-native-web',
    },
    extensions: ['.web.tsx', '.web.ts', '.web.jsx', '.web.js', '.tsx', '.ts', '.jsx', '.js'],
  },
};

const configBuilder = (
  env: Record<string, string>,
  argv: { mode: webpack.Configuration['mode'] }
) => {
  const mode = argv.mode ?? config.mode;
  config.mode = mode;

  config.plugins?.push(
    new webpack.DefinePlugin({
      __DEV__: mode === 'development',
    })
  );

  return config;
};

export default configBuilder;
