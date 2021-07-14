const HtmlWebPackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = (env) => {
  return {
    entry: './index.js',
    mode: 'development',
    output: {
      filename: 'bundle.js',
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
    plugins: [
      new HtmlWebPackPlugin({
        template: './public/index.html',
        filename: 'index.html',
        inject: true
      })
    ]
  }
}