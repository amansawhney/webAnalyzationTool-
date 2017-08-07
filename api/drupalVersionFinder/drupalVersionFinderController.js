const request = require('request');
exports.getDropalVersion = (req, res, next) => {
  request(
    {
      url: 'https://' + req.body.url + '/CHANGELOG.txt',
      rejectUnauthorized: false,
    },
    function(error, response, body) {
      if (error) {
        next(error);
      } else {
        res.send({ version: body.slice(8, 12) });
      }
    },
  );
};
