var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
   entry: './client/main.jsx',
   output: {
     path: path.resolve(__dirname, 'build'),
     filename: 'main.bundle.js'
   },
   plugins: [
      new HtmlWebpackPlugin({
        title: 'Coalesce',
        filename: 'index.html',
        template: 'client/index.ejs'
      }),
      new webpack.ProvidePlugin({
        _: 'lodash',
        React: 'react',
      })
   ],
   module: {
     rules: [
       {
         test: /\.less$/,
         use: [{
           loader: "style-loader"
         }, {
           loader: "css-loader" // translates CSS into CommonJS
         }, {
           loader: "less-loader" // compiles Less to CSS
         }]
       }, {
         test: /\.jsx$/,
         loader: 'babel-loader',
         query: {
           presets: ['react', 'es2015'],
           plugins: ["transform-class-properties"]
         },
         include: [
           path.resolve(__dirname, 'client')
         ]
       }
     ]
   },
   resolve: {
     alias: {
       'react-dom': 'react-dom/index.js'
     }
   }
};
