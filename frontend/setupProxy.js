const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    '/socket.io',
    createProxyMiddleware({
      target: 'http://localhost:5000', // Remplacez ceci par l'URL de votre serveur Socket.IO
      changeOrigin: true,
      ws: true,
    }),
  )
}
