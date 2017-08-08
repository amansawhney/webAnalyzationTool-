const request = require('request');
const check = require('httpcheck');

exports.getVersion = (req, res, next) => {
  var error = true;
  request(
    {
      url: 'https://' + req.body.url + '/feed',
      rejectUnauthorized: false,
    },
    function(error, response, body) {
      console.log(body);
      if (body.lastIndexOf('https://wordpress.org/?') < 0) {
        res.send({ version: 'false' });
      } else {
        res.json({
          version: body
            .substring(
              body.lastIndexOf('https://wordpress.org/?') + 25,
              body.lastIndexOf('https://wordpress.org/?') + 30,
            ).replace('</', ''),
        });
      }
    },
  );
};
