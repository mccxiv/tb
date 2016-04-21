

module.exports = {
  target: 'node',
  entry: './server.js',
  node: {
    __filename: false, 
    __dirname: false
  },
  output: {
    path: './_dist',
    filename: 'server.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel'
      }
    ]
  },
  babel: {
    presets: ['es2015', 'stage-0'],
    plugins: ['transform-runtime']
  }
};
