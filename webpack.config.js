const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/pages/index.js",
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      favicon: "./src/images/favicon.ico",
    }),
  ],
};
