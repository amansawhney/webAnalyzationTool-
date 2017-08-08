const osmosis = require('osmosis');
const check = require('httpcheck');

exports.getVersion = (req, res, next) => {
  var error = true;
  check({ url: 'http://' + req.body.url + '/feed' }, function(err) {
    if (err) {
      console.log('HTTP check for example.com failed!');
      res.send({ version: 'false' });
    } else {
      osmosis
        .get('http://' + req.body.url + '/feed')
        .find('body')
        .set('location')
        .data(function(data) {
          if (data.location.lastIndexOf('https://wordpress.org/?') === -1) {
            res.send({ version: 'false' });
          } else {
            res.json({
              version: data.location
                .substring(
                  data.location.lastIndexOf('https://wordpress.org/?') + 1,
                )
                .slice(24, 29)
                .replace('\n', '')
                .replace('\t', ''),
            });
          }
        });
    }
    console.log('HTTP check for example.com has passed');
  });
};
