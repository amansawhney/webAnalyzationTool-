const findlinks = require('findlinks');

exports.getBrokenLinks = (req, res) => {
  findlinks({ src: 'http://' + req.body.url })
    .then(result => res.send(result))
    .catch(err => next(err));
};
