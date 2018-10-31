const webpack = require("webpack");
const path = require("path");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

module.exports = {
  entry: ["@babel/polyfill", "./src/app.js"],
  output: {
    path: path.join(__dirname, "public", "dist"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        loader: "babel-loader",
        test: /\.js$/,
        exclude: /node_modules/
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
    ]),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new BundleAnalyzerPlugin({ openAnalyzer: false })
  ]
};
