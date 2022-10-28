import * as path from 'path';
import * as webpack from 'webpack';
import nodeExternals from 'webpack-node-externals';
import CopyPlugin from 'copy-webpack-plugin';

const config: (env: any) => webpack.Configuration = (env = {}) => {
  const isProduction = !!env.production;
  const distDir = isProduction ? path.resolve(__dirname, 'dist') : path.resolve(__dirname, 'tmp');
  const plugins = [
    new CopyPlugin({
      patterns: [
        { from: path.resolve(__dirname, 'src/schema.graphql'), to: distDir },
        { from: path.resolve(__dirname, 'package.json'), to: distDir },
        {
          from: path.resolve(__dirname, 'src', 'app.config.json'),
          to: path.resolve(__dirname, distDir, 'app.config.json'),
        },
      ],
    }),
  ];

  return {
    mode: isProduction ? 'production' : 'development',
    target: ['node', 'es2020'],
    externals: [nodeExternals()],
    entry: {
      app: path.resolve(__dirname, 'src/index'),
    },
    output: {
      filename: '[name].js',
      path: distDir,
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
          exclude: [/node_modules/],
          options: {
            configFile: 'tsconfig.json',
          },
        },
      ],
    },
    plugins: plugins,
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
      extensions: ['.ts', '.js', '.json'],
    },
    devtool: isProduction ? false : 'cheap-module-source-map',
  };
};

export default config;
