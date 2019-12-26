const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const isDev = () => process.env.NODE_ENV !== "production";

module.exports = {
  entry: {
    index: "./src/index.tsx"
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "static/js/[name].[hash].js",
    chunkFilename: "static/chunks/[name].[hash].js"
    // publicPath: "/"
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    alias: {
      "@": path.resolve(__dirname, "src")
    }
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: ["babel-loader", "awesome-typescript-loader"]
      },
      {
        test: /\.s?css$/,
        use: [
          isDev() ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.svg$/,
        loader: "svg-sprite-loader"
      },
      {
        test: /\.(jpg|png|bmp|jpe?g|gif|ico)$/,
        loader: "url-loader",
        options: {
          limit: 8192,
          outputPath: "./static/assets/images",
          name: "[name].[hash].[ext]"
          // publicPath: "./static/assets/images"
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)$/,
        loader: "url-loader",
        options: {
          limit: 8192,
          outputPath: "./static/assets/media",
          name: "[name].[hash].[ext]"
          // publicPath: "./static/assets/media"
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/,
        loader: "url-loader",
        options: {
          limit: 8192,
          outputPath: "./static/assets/fonts",
          name: "[name].[hash].[ext]"
          // publicPath: "./static/assets/fonts"
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "web-im",
      template: "./src/index.html",
      favicon: "./src/favicon.ico"
    })
  ]
};
