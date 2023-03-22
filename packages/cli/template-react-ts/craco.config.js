const { resolve } = require('path');

const CracoLessPlugin = require('craco-less');
const { theme } = require('antd');

const customTheme = require('./src/config/theme/default.json');

const { defaultAlgorithm, defaultSeed } = theme;

const mapToken = defaultAlgorithm(defaultSeed);

const devServer = {
  port: 9900,
  proxy: {
    '/api': {
      target: 'http://localhost:10000',
      changeOrigin: true,
      // pathRewrite: {
      //   '^/api': '',
      // },
    },
  },
};

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        modifyLessRule: () => {
          return {
            test: /\.less$/,
            use: [
              'style-loader',
              {
                loader: 'css-loader',
                options: {
                  modules: {
                    localIdentName: 'ns-[path][name]__[local]',
                  },
                },
              },
              {
                loader: 'less-loader',
                options: {
                  lessOptions: {
                    modifyVars: { ...mapToken, ...customTheme.token },
                  },
                },
              },
            ],
          };
        },
      },
    },
  ],
  webpack: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
    configure: (webpackConfig) => {
      webpackConfig.resolve.fallback = {
        crypto: false,
      };
      return webpackConfig;
    },
  },
  devServer,
};
