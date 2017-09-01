module.exports = {
  entry: {
    'bundle': './src/index.js'
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/src/built'
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
    contentBase: './src/',
    publicPath: '/built/',
    hot: true,
    open: true,
    inline: true,
    port: 3200
  }
};
