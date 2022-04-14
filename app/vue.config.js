module.exports = {
  devServer: {
    proxy: {
      "/socket.io": {
        target: "http://localhost:5005",
        ws: true,
        changeOrigin: true,
      },
    },
  },
};
