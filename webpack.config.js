const path = require('path')

module.exports = (env) => {
  return {
    entry: {
      BrowserRouterHook: './lib/index.js'
    },
    mode: 'production',
    output: {
      path: path.join(__dirname, 'dist'),
      filename: 'browser-router-hook.umd.js',
      libraryTarget: 'umd',
      library: 'BrowserRouterHook'
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