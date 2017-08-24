const tenon = require('tenon-api-client');
const keys = require('../../keys');
const _ = require('lodash');

exports.getADA = (req, res, next) => {
  tenon(
    {
      url: 'https://' + req.body.url, // required
      key: keys.tenonAPIKEY || process.env.tenonAPIKEY, // required
      // any additional options, see below
    },
    (err, response) => {
      if (err) {
        next(err);
      } else {
        var arr = [];
        console.log(response.resultSet);

        for (var x in response.resultSet) {
          response.resultSet[x] = {
            errorTitle: response.resultSet[x].errorTitle,
            errorDescription: response.resultSet[x].errorDescription,
            priority: response.resultSet[x].priority,
          };
        }
        res.json({
          numberOfFailedTests: response.resultSummary.tests.failing,
          errors: response.resultSet,
        }); // or something useful
      }
    },
  );
};
