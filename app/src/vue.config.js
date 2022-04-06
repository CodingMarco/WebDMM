module.exports = {
  devServer: {
    proxy: {
      "^/backend": {
        target: "http://localhost:5001",
        changeOrigin: true,
      },
    },
  },
};
