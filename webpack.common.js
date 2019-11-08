const path = require('path')
const merge = require('webpack-merge')
// 生成html文件
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 合并css
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const isDev = process.env.NODE_ENV === 'development'

const exWebpack = isDev ?
  require('./webpack.dev') :
  require('./webpack.prod')

const _webpack = {
  entry: {
    index: path.resolve('src/entry/index.js')
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, './dist'),
    publicPath: isDev ? '/' : './'
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
      ]
    },
    {
      test: /\.less$/,
      exclude: /node_modules/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        'less-loader',
      ]
    },
    {
      test: /\.js$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'babel-loader'
        },
      ]
    },
    {
      test: /\.(png|jpg|gif)$/i,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 5000,
        },
      },],
    }
    ]
  },
  resolve: {
    alias: {
      components: path.join(__dirname, '../', 'src/components/'),
      vue$: 'vue/dist/vue.esm.js'
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'name',
      template: path.resolve(__dirname, './src/entry/index.html')
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    // new BundleAnalyzerPlugin() // 查看打包后的体积比例
  ],
}

module.exports = merge(_webpack, exWebpack)