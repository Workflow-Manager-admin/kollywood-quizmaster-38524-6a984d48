const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

/**
 * Custom Webpack config for Kollywood QuizMaster
 * (Ensures devServer.allowedHosts is set to 'all')
 */

module.exports = {
  entry: "./kollywood_quizmaster_frontend/src/index.js",
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "bundle.js",
    clean: true,
    publicPath: "/",
  },
  mode: "development",
  resolve: {
    extensions: [".js", ".jsx"],
    alias: {
      "@": path.resolve(__dirname, "../kollywood_quizmaster_frontend/src"),
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: path.resolve(__dirname, "../kollywood_quizmaster_frontend/src"),
        loader: "babel-loader",
        options: {
          rootMode: "upward"
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        type: "asset/resource"
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./kollywood_quizmaster_frontend/public/index.html",
      favicon: false,
    }),
  ],
  // Development server settings: allow all hosts to prevent "Invalid Host header" errors
  devServer: {
    allowedHosts: "all",
    host: "0.0.0.0",
    // For very old Webpack Dev Server versions, disableHostCheck might be needed:
    // disableHostCheck: true,
    static: {
      directory: path.join(__dirname, "../kollywood_quizmaster_frontend/public"),
    },
    compress: true,
    port: 3000,
    open: false,
    hot: true,
    historyApiFallback: true
  },
  // Experimental: enable in-memory filesystem (if supported)
  // cache: { type: "memory" },
};
