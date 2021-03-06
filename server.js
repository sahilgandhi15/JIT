const express = require('express');
const app = express();
// If an incoming request uses
// a protocol other than HTTPS,
// redirect that request to the
// same url but with HTTPS
// server.js
const path = require('path');
// ...
// For all GET requests, send back index.html
// so that PathLocationStrategy can be used
app.use(express.static(__dirname + '/dist'));
app.get('/*', function (req, res) {
  console.log("test");
    res.sendFile(path.join(__dirname + '/dist/index.html'));
});
const forceSSL = function () {
    return function (req, res, next) {
        if (req.headers['x-forwarded-proto'] !== 'https') {
            return res.redirect(
                ['https://', req.get('Host'), req.url].join('')
            );
        }
        next();
    }
}
// Start the app by listening on the default
// Heroku port
console.log("start site");
app.listen(process.env.PORT || 8080);
// Instruct the app
// to use the forceSSL
// middleware
app.use(forceSSL());
