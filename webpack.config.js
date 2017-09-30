var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
   entry: './src/client/main.js',
   output: {
     path: path.resolve(__dirname, 'build'),
     filename: 'main.bundle.js'
   },
   plugins: [
     new HtmlWebpackPlugin({
       title: 'Coalesce',
       filename: 'index.html'
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
         test: /\.js$/,
         loader: 'babel-loader',
         query: {
           presets: ['es2015', 'react'],
           plugins: []
         },
         include: [
           path.resolve(__dirname, 'src')
         ]
       }
     ]
   }
};
