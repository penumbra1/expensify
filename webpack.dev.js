const webpack = require("webpack");
const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const path = require("path");

module.exports = merge(common, {
  mode: "development",
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [
          { loader: "style-loader", options: { sourceMap: true } },
          { loader: "css-loader", options: { sourceMap: true } },
          { loader: "sass-loader", options: { sourceMap: true } }
        ]
      }
    ]
  },
  plugins: [
    new webpack.EnvironmentPlugin([
      "FIREBASE_API_KEY",
      "FIREBASE_AUTH_DOMAIN",
      "FIREBASE_DATABASE_URL",
      "FIREBASE_PROJECT_ID",
      "FIREBASE_STORAGE_BUCKET",
      "FIREBASE_MESSAGING_SENDER_ID"
    ])
  ],
  devtool: "cheap-module-eval-source-map",
  devServer: {
    contentBase: path.join(__dirname, "public"),
    historyApiFallback: true,
    publicPath: "/dist/"
  }
});
