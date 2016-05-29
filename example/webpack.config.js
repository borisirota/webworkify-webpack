module.exports = {
    entry: {
        app: ["./example/main.js"]
    },
    output: {
        filename: "output.js"
    },
    module: {
      loaders: [
          {
              test: /\.jsx?$/,
              exclude: /(node_modules|bower_components)/,
              loader: 'babel',
              query: {
                  presets: ['es2015']
              }
          }
      ]
    }
};
