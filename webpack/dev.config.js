const path = require('path')

module.exports = {
  mode: 'development',

  entry: {
    carousel: './src/js/index.js'
  },

  output: {
    path: path.resolve(__dirname, '..', 'dist'),
    filename: '[name].js',
    library: 'Carousel',
    libraryTarget: 'umd',
    libraryExport: 'default',
    publicPath: '/'
  },

  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.svg$/,
        loader: 'url-loader'
      }
    ]
  },

  devServer: {
    compress: true,
    contentBase: path.resolve(__dirname, '..'),
    clientLogLevel: 'none',
    quiet: false,
    open: true,
    historyApiFallback: {
      disableDotRule: true
    },
    watchOptions: {
      ignored: /node_modules/
    }
  }
}
