var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: './src/JSLite.js',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'JSLite.js',
    library: 'JSLite',
    libraryTarget: 'umd'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel' }
    ]
  },
  babel: {
    presets: ["es2015"],
    // loose: 'all'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"'
      }
    })
  ],
  devtool: 'source-map'
}
