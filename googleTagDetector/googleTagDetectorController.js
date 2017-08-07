const request = require('request');

exports.getGADATA = (req, res, next) => {
  request(
    { url: 'http://' + req.body.url, rejectUnauthorized: false },
    function(error, response, body) {
      console.log('error:', error); // Print the error if one occurred
      console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      console.log('body:', body); // Print the HTML for the Google homepage.{
      res.send({
        GTM: body.toString().includes('googletagmanager.com'),
        analytics: body.toString().includes('google-analytics.com'),
      });
    },
  );
};
