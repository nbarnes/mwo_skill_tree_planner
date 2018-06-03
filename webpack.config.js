const path = require('path');

var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  devtool: 'cheap-module-eval-source-map',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test:/\.(s*)css$/,
        use: ExtractTextPlugin.extract({
          fallback:'style-loader',
          use:['css-loader'],
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({ filename: 'app_bundle.css' }),
  ],
  watch: false,
  watchOptions: {
    ignored: /node_modules/
  }
};
