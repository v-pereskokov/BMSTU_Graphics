module.exports = {
  entry: {
    'bundle': './public/index.js'
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/public/built'
  },

  watch: true,
  devtool: 'source-map',

  resolve: {
    extensions: ['.js', '.json']
  },

  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        use: ['babel-loader', 'source-map-loader']
      }
    ]
  },

  devServer: {
    contentBase: './public/',
    publicPath: '/built/'
  }
};
