const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const baseConfig = require("./webpack.config");

module.exports = merge(baseConfig, {
  mode: "production",
  devtool: "source-map",
  optimization: {
    splitChunks: {
      chunks: "async",
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: "~",
      name: false,
      cacheGroups: {
        vendors: {
          name: `chunk-vendors`,
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          chunks: "initial"
        },
        common: {
          name: `chunk-common`,
          minChunks: 2,
          priority: -20,
          chunks: "initial",
          reuseExistingChunk: true
        }
      }
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CompressionWebpackPlugin({
      algorithm: "brotliCompress", // 压缩算法，Node 11.7.0 对 Brotli 有内置支持
      test: /\.(js|css)(\?.*)?$/i, // 压缩 js 和 css
      threshold: 10240, // 大于 10kb 的资源才会压缩
      minRatio: 0.8 // 压缩比大于 0.8 的资源才会压缩
    }),
    new HtmlWebpackPlugin({
      title: "web-im",
      template: "./src/index.html",
      favicon: "./src/favicon.ico",
      hash: true, //防止缓存
      minify: {
        removeComments: true, //删除Html注释
        collapseWhitespace: true, //去除空格
        removeAttributeQuotes: true //去除属性引号
      }
    }),
    new MiniCssExtractPlugin({
      filename: "static/css/index.[hash].css",
      chunkFilename: "static/chunks/[id].css"
    })
  ]
});
