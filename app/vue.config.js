module.exports = {
  devServer: {
    proxy: {
      "^/backend": {
        target: "http://localhost:5001",
        pathRewrite: { "^/backend": "/" },
        changeOrigin: true,
        logLevel: "debug",
      },
    },
  },
};
