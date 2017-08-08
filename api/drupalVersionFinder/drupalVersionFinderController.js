const request = require('request');
const check = require('httpcheck');

exports.getDropalVersion = (req, res, next) => {
  check({ url: 'http://' + req.body.url + '/CHANGELOG.txt' }, function(err) {
    if (err) {
      console.log('HTTP check for example.com failed!');
      res.send({ version: 'false' });
    } else {
      request(
        {
          url: 'https://' + req.body.url + '/CHANGELOG.txt',
          rejectUnauthorized: false,
        },
        function(error, response, body) {
          if (error) {
            next(error);
          } else {
            body.includes('drupal')
              ? res.send({ version: body.slice(8, 12) })
              : res.send({ version: false });
          }
        },
      );
    }
  });
};
