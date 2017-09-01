module.exports = {
  entry: {
    'bundle': './src/index.js'
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/src/built'
  },

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
  }
};
