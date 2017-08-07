const nlc = require('node-linkchecker');
exports.getBrokenLinks = (req, res) => {
    nlc.check(req.body.url).then(function(result) {
        res.send(result);
    });
}
