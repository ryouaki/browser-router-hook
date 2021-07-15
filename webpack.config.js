const path = require('path')

module.exports = (env) => {
  return {
    entry: {
      RouterHook: './lib/index.js'
    },
    mode: 'production',
    output: {
      path: path.join(__dirname, 'dist'),
      filename: 'router-hook.umd.js',
      libraryTarget: 'umd',
      library: 'RouterHook'
    },
    target: ['web', 'es5'],
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/
        }
      ]
    },
    plugins: []
  }
}