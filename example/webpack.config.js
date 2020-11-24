module.exports = {
  mode: "development",
  entry: {
    app: ['./example/main.js']
  },
  output: {
    filename: 'output.js',
    pathinfo: true
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  }
}
