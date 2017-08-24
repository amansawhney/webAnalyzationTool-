const psi = require('psi');

exports.getPSI = (req, res) => {
  var data = {};
  psi(req.body.url, {
    strategy: 'mobile',
  }).then(mobile => {
    data.mobile = {
      basic: mobile.ruleGroups,
    };
    psi(req.body.url, {
      strategy: 'desktop',
    }).then(desktop => {
      var response = satnazireResponseFromPSI(desktop);
      data.desktop = {
        basic: desktop.ruleGroups,
      };
      data.errors = response.formattedResults.ruleResults;
      res.send(data);
    });
  });
};

function satnazireResponseFromPSI(data) {
  var response = data;
  for (var x in response.formattedResults.ruleResults) {
    console.log(x);
    if (response.formattedResults.ruleResults[x].ruleImpact == 0) {
      delete response.formattedResults.ruleResults[x];
    } else {
      response.formattedResults.ruleResults[x] = {
        summary: response.formattedResults.ruleResults[x].summary,
        groups: response.formattedResults.ruleResults[x].groups,
        ruleImpact: response.formattedResults.ruleResults[x].ruleImpact,
      };
    }
  }
  return response;
}
