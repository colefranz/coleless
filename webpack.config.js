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
           plugins: []
         },
         include: [
           path.resolve(__dirname, 'client')
         ]
       }
     ]
   },
   resolve: {
     alias: {
       'react': 'react/index.js',
       'react-dom': 'react-dom/index.js'
     }
   }
};
