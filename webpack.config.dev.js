const merge = require("webpack-merge");
const path = require("path");
const baseConfig = require("./webpack.config");

module.exports = merge(baseConfig, {
  mode: "development",
  devtool: "source-map",
  devServer: {
    clientLogLevel: "warning",
    historyApiFallback: true, //在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
    contentBase: path.resolve(__dirname, "src"), //告诉服务器从哪个目录中提供内容。只有在你想要提供静态文件时才需要。
    compress: true, //一切服务都启用 gzip 压缩
    hot: true, // 热加载
    inline: true, //自动刷新
    // open: true, //自动打开浏览器
    openPage: "index.html",
    overlay: { warnings: false, errors: true }, // 在浏览器上全屏显示编译的errors或warnings。
    publicPath: "/"
  }
});
