const path = require("path");
const CleanPlugin = require('clean-webpack-plugin');

module.exports = {
  mode: "production",
  entry: "./src/app.ts",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "./dist"),
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new CleanPlugin.CleanWebpackPlugin()
  ],
  resolve: {
    extensions: [".ts", ".js"],
  },
  devtool: false,
};
