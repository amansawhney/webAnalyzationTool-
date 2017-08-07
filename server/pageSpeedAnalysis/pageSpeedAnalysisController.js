const psi = require('psi');

exports.getPSI = (req, res) => {
  var data = {};
  psi(req.body.url, {
    strategy: 'mobile',
  }).then(moblie => {
    console.log(moblie);
    data.moblieSpeed = moblie.ruleGroups.SPEED.score;
    data.moblieUsability = moblie.ruleGroups.USABILITY.score;
    psi(req.body.url, {
      strategy: 'desktop',
    }).then(desktop => {
      console.log(req.body.url);
      console.log(desktop);
      data.desktopSpeed = desktop.ruleGroups.SPEED.score;
      res.send(data);
    });
  });
};
