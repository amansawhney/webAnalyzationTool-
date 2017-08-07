const express = require('express');
const app = express();
const ssllabs = require('node-ssllabs');


//middleWare
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//routers
const pageSpeedAnalysisRouter = require('./pageSpeedAnalysis/pageSpeedAnalysisRouter');

app.use('/psi', pageSpeedAnalysisRouter);
app.post('/ssl', (req, res) => {
  ssllabs.scan(req.body.url, function(err, host) {
    res.send(host.endpoints[0]);
  });
});

app.listen(3000);
