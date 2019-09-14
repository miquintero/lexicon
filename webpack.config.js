const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/index.js', 
  mode: process.env.NODE_ENV,
  module: {
    rules:[
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/, 
        use: {
          loader: 'babel-loader', 
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }, 
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
          }, 
          {
            loader: 'postcss-loader'
          },
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass')
            }
          } 
        ]
      }
    ]
  }, 
  resolve: { extensions: ["*", ".js", ".jsx"] },
  output: {
    path: path.resolve(__dirname, 'dist/'), 
    publicPath: '/dist/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: path.join(__dirname, 'public/'),
    port: 3001, 
    publicPath: "http://localhost:3001/dist/",
    hotOnly: true
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'bundle.css'
    }), 
    new webpack.HotModuleReplacementPlugin()
  ],
  mode: 'development'
}