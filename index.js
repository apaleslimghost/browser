var http  = require('http');
var route = require('boulevard');
var fs    = require('fs');
var log   = require('morgan')('dev');

module.exports = function(file, opts) {
	opts = opts || {};

	http.createServer((req, res) => log(req, res, () => route({
		'/bundle.js': function(req, res) {
			res.setHeader('content-type', 'application/javascript')
			fs.createReadStream(file).pipe(res);
		},

		'/': function(req, res) {
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
		}
	})(req, res))).listen(opts.port || opts.p || 3000);
};
