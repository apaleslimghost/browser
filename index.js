var http  = require('http');
var route = require('boulevard');
var fs    = require('fs');
var log   = require('morgan')('dev');
var open  = require('open');

module.exports = function(file, opts) {
	opts = opts || {};
	var port = opts.port || opts.p || 3000;

	http.createServer((req, res) => log(req, res, () => route.withFourOhFour(function(req, res) {
		res.setHeader('content-type', 'text/html');
		res.end(`<!doctype html>
		<html lang="en">
			<head>
				<meta charset="utf-8">
				<title>${opts.title || opts.t || file}</title>
			</head>
			<body>
				<script src="/bundle.js"></script>
			</body>
		</html>`);
	})({
		'/bundle.js': function(req, res) {
			res.setHeader('content-type', 'application/javascript')
			fs.createReadStream(file).pipe(res);
		}
	})(req, res))).listen(port, () => {
		if(!opts.noOpen && !opts.n) {
			open(`http://localhost:${port}`);
		}
	});
};
