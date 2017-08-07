const express = require('express');
const app = express();
var tenon = require('tenon-api-client');
const keys = require('../keys');
const _ = require('lodash');

//middleWare
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//routers
const pageSpeedAnalysisRouter = require('./pageSpeedAnalysis/pageSpeedAnalysisRouter');
const ssllabsSiteSecurityTestRouter = require('./ssllabsSiteSecurityTest/ssllabsSiteSecurityTestRouter');

app.use('/psi', pageSpeedAnalysisRouter);
app.use('/ssl', ssllabsSiteSecurityTestRouter);
app.post('/tenon', (req, res) => {
  tenon(
    {
      url: 'https://' + req.body.url, // required
      key: keys.tenonAPIKEY, // required
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
});

app.listen(3000);
