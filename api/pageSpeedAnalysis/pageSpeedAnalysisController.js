const psi = require('psi');

exports.getPSI = (req, res) => {
  var data = {};
  psi(req.body.url, {
    strategy: 'mobile',
  }).then(moblie => {
    console.log(moblie);
    data.moblie = moblie;
    psi(req.body.url, {
      strategy: 'desktop',
    }).then(desktop => {
      console.log(req.body.url);
      console.log(desktop);
      data.desktop = desktop;
      res.send(data);
    });
  });
};
