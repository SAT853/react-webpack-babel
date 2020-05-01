const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    app: "./public/index.js",
  },
  output: {
    path: path.join(__dirname, "build"),
    filename: "index_bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|j?g|svg|gif)?$/,
        exclude: /node_modules/,
        use: "file-loader",
      },
    ],
  },
  plugins: [
    new htmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
