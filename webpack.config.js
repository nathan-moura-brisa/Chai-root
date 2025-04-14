const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-ts");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (webpackConfigEnv, argv) => {
  const orgName = "Chai";
  const defaultConfig = singleSpaDefaults({
    orgName,
    projectName: "root-config",
    webpackConfigEnv,
    argv,
    disableHtmlGeneration: true,
  });

  const environment = webpackConfigEnv.environment || 'dev';

  return merge(defaultConfig, {
    devServer: {
      overlay: false,
      proxy: {
        "/teste": {
          target: "https://novorevanh-03.brisanet.net.br",
          changeOrigin: true,
          secure: false,
          pathRewrite: { "^/teste": "" },
          cookieDomainRewrite: {
            "novorevanh-03.brisanet.net.br": "localhost"
          },
          onProxyReq: (proxyReq, req, res) => {
            console.log(`Proxying to: ${proxyReq.protocol}//${proxyReq.host}${proxyReq.path}`);
          },
        },
      },
    },
    plugins: [
      new HtmlWebpackPlugin({
        inject: false,
        template: "src/index.ejs",
        templateParameters: {
          isLocal: webpackConfigEnv && webpackConfigEnv.isLocal,
          environment,
          orgName,
        },
      }),
    ],
  });
};
