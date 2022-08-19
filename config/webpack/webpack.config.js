const path = require('path')
const webpack = require('webpack')

// Extracts CSS into .css file
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// Removes exported JavaScript files from CSS-only entries
// in this example, entry.custom will create a corresponding empty custom.js file
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts')

const mode =
  process.env.NODE_ENV === 'development' ? 'development' : 'production'

module.exports = {
  mode,
  optimization: {
    moduleIds: 'deterministic',
  },
  devtool: 'source-map',
  entry: {
    application: [
      './app/javascript/entries/application.tsx',
      './app/javascript/styles/application.sass',
    ],
  },
  output: {
    filename: '[name].js',
    sourceMapFilename: '[file].map',
    path: path.resolve(__dirname, '..', '..', 'app/assets/builds'),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx|)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /css$/i,
        use: ['postcss-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|eot|woff2|woff|ttf|svg)$/i,
        use: 'file-loader',
      },
    ],
  },
  resolve: {
    // Add additional file types
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.sass', '.scss', '.css'],
    alias: {
      '@': path.resolve('app/javascript'),
    },
  },
  plugins: [
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
    new RemoveEmptyScriptsPlugin(),
    new MiniCssExtractPlugin(),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
  ],
}
