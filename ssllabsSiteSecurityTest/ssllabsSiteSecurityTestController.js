const ssllabs = require('node-ssllabs');

exports.getSSL = (req, res) => {
  ssllabs.scan(req.body.url, function(err, host) {
    res.send(host.endpoints[0]);
  });
};
