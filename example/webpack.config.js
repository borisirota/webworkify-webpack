module.exports = {
  entry: {
    app: ['./example/main.js']
  },
  output: {
    filename: 'output.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      }
    ]
  }
}
