const request = require('request');
const gtmd = require('google-tag-manager-detection');

exports.getGADATA = (req, res, next) => {
  request(
    { url: 'http://' + req.body.url, rejectUnauthorized: false },
    function(error, response, body) {
      if (error) {
        next(error);
      } else {
        gtmd.checkUrlForGaViaGtm('http://' + req.body.url, function(result) {
          console.log(result);
          if (result.has_ga || result.has_gtm) {
            res.send(result);
          } else {
            gtmd.checkUrlForGaViaGtm('http://www.' + req.body.url, function(
              result,
            ) {
              console.log(result);
              if (result.has_ga || result.has_gtm) {
                res.send(result);
              } else {
                res.send({
                  GTM: body.toString().includes('googletagmanager.com'),
                  analytics: body.toString().includes('google-analytics.com'),
                });
              }
            });
          }
        });
      }
    },
  );
};
