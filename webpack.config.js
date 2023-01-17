// const path = require("path");
// const HtmlWebpackPlugin = require("html-webpack-plugin");

// module.exports = {
//   mode: "development",
//   entry: "./src/index.tsx",
//   output: {
//     path: path.join(__dirname, "/dist"),
//     filename: "bundle.js",
//   },
//   resolve: {
//     extensions: [".ts", ".tsx", ".js"],
//   },
//   module: {
//     rules: [
//       {
//         test: /\.tsx?$/,
//         loader: "ts-loader",
//       },
//       {
//         test: /\.css$/,
//         use: ["style-loader", "css-loader"],
//       },
//       {
//         test: /\.(png|svg|jpg|jpeg|gif|ico|json)$/,
//         exclude: /node_modules/,
//         use: ["file-loader?name=[name].[ext]"], // ?name=[name].[ext] is only necessary to preserve the original file name
//       },
//     ],
//   },
//   plugins: [
//     new HtmlWebpackPlugin({
//       template: "./public/index.html",
//     }),
//   ],
// };
