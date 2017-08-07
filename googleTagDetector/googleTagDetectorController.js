const request = require('request');

exports.getGADATA = (req, res, next) => {
  request(
    { url: 'http://' + req.body.url, rejectUnauthorized: false },
    function(error, response, body) {
      if (error) {
        next(error);
      } else {
        res.send({
          GTM: body.toString().includes('googletagmanager.com'),
          analytics: body.toString().includes('google-analytics.com'),
        });
      }
    },
  );
};
