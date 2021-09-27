const path = require("path");
const nodeExternals = require("webpack-node-externals");
const NodemonPlugin = require("nodemon-webpack-plugin");
//
module.exports = (_env, argv) => {
  const isProd = argv.mode === "production";
  const config = {
    mode: argv.mode,
    output: {
      path: path.resolve(__dirname, "./dist"),
      publicPath: "/",
      filename: "main.js",
      clean: true,
    },
    // target: "node", // For Webpack 5, replace target: 'node' with the externalsPreset object:
    externalsPresets: { node: true }, // in order to ignore built-in modules like path, fs, etc.
    externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
    module: {
      rules: [
        {
          test: /\.js$/, // test: '빌드할 파일 확장자 정규식'
          exclude: /node_modules/, // exlude: '제외할 파일 정규식'
          use: {
            loader: "babel-loader", // loader: '사용할 로더 이름'
          },
        },
      ],
    },
    plugins: [],
  };
  //
  if (!isProd) {
    config.plugins.push(new NodemonPlugin());
  }
  //
  return config;
};
