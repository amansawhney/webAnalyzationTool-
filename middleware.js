module.exports = app => {
    const bodyParser = require('body-parser');
    const timeout = require('connect-timeout'); //express v4

    app.use(timeout('100000s'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    //cleans up posted URL
    app.use(function(req, res, next) {
        if (req.body.url) {
            req.body.url = req.body.url
                .replace('http://', '')
                .replace('www.', '')
                .replace('https://', '');
        }

        var allowedOrigins = ['http://127.0.0.1:8000', 'http://localhost:8000', 'https://codejockey.com', 'https://support.codejockey.com', 'https://staging.support.codejockey.com', 'https://dev.support.codejockey.com'];
        var origin = req.headers.origin;
        if (allowedOrigins.indexOf(origin) > -1) {
            res.setHeader('Access-Control-Allow-Origin', origin);
        }
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

        next();
    });
};
