const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const baseConfig = require("./webpack.config");

module.exports = merge(baseConfig, {
  mode: "production",
  plugins: [
    new HtmlWebpackPlugin({
      title: "web-im",
      template: "./src/index.html",
      favicon: "./src/favicon.png",
      hash: true, //防止缓存
      minify: {
        removeComments: true, //删除Html注释
        collapseWhitespace: true, //去除空格
        removeAttributeQuotes: true //去除属性引号
      }
    })
  ]
});
