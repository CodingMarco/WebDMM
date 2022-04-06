const express = require("express");
const webServer = express();
const { createProxyMiddleware } = require("http-proxy-middleware");

webServer.use(
  "/backend",
  createProxyMiddleware({
    target: "http://localhost:5001",
    changeOrigin: true,
    // We want to request eg. /api/users instead of /backend/api/users from the actual backend
    pathRewrite: { "^/backend": "/" },
  })
);

webServer.use(express.static(__dirname + "/dist"));

webServer.listen(8080);
