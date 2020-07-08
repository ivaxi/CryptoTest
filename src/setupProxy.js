
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
	
	app.use(
	  '/v1',
	  createProxyMiddleware({
		target: "https://pro-api.coinmarketcap.com",		
		changeOrigin: true,
		onProxyReq: function onProxyReq(proxyReq, req, res) {
			console.log("REAL PROXY REQUESTED: " + proxyReq.path)
			proxyReq.setHeader('X-CMC_PRO_API_KEY', '6fc4b4d4-6a77-4425-98c8-86a0458d2a30')
		  },
		onError: function onError(err, req, res) {
			res.writeHead(500, {
			  'Content-Type': 'text/plain',
			});
			res.end(req);
		  },
		onProxyRes: function (proxyRes, req, res) {
			proxyRes.headers['Cache-Control'] = 'no-cache'; 						
		  }

		  
	  })
	)
	app.use(
		'/sandbox',
		createProxyMiddleware({
		  target: "https://sandbox-api.coinmarketcap.com",		  
		  changeOrigin: true,
		  pathRewrite: function (path, req) { return path.replace('sandbox', 'v1') },
		  onProxyReq: function onProxyReq(proxyReq, req, res) {
			  console.log("SANDBOX PROXY REQUESTED: " + proxyReq.path)			  
			  proxyReq.setHeader('X-CMC_PRO_API_KEY', 'a3f4b904-6bb2-4e10-8d51-3189f67223dc')
			},
		  onError: function onError(err, req, res) {
			  res.writeHead(500, {
				'Content-Type': 'text/plain',
			  });
			  res.end(req);
			},		  
		onProxyRes: function (proxyRes, req, res) {
				proxyRes.headers['Cache-Control'] = 'no-cache'; 						
			  }
	
		})
	  )
  }