const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/index.js', 
  mode: process.env.NODE_ENV,
  module: {
    rules:[
      {
        test: /\.(js|jsx|tsx)$/,
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
  resolve: { extensions: ["*", ".js", ".jsx", ".ts", ".tsx"] },
  output: {
    path: path.resolve(__dirname, 'dist/'), 
    filename: 'bundle.js',
    publicPath: '/'
  },
  devServer: {
    contentBase: path.join(__dirname, 'public/'),
    port: 3001, 
    publicPath: "http://localhost:3001/",
    historyApiFallback: true,
    hotOnly: true
  },
  plugins: [
    new Dotenv(),
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'bundle.css'
    }), 
    new webpack.HotModuleReplacementPlugin()
  ],
  mode: 'development'
}
