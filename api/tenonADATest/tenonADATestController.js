const tenon = require('tenon-api-client');
const keys = require('../../keys');
const _ = require('lodash');

exports.getADA = (req, res) => {
  tenon(
    {
      url: 'https://' + req.body.url, // required
      key: keys.tenonAPIKEY || process.env.tenonAPIKEY, // required
      // any additional options, see below
    },
    (err, response) => {
      if (err) {
        res.send('Oops: ' + err);
      } else {
        res.json(_.merge(response.resultSummary, response.request)); // or something useful
      }
    },
  );
};
