const { resolve } = require("path");
const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        modifyLessRule: () => {
          return {
            test: /\.less$/,
            use: [
              "style-loader",
              {
                loader: "css-loader",
                options: {
                  modules: {
                    localIdentName: "[path][name]__[local]",
                  },
                },
              },
              "less-loader",
            ],
          };
        },
      },
    },
  ],
  webpack: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
};
