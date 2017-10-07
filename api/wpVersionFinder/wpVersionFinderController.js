const request = require('request');
const cheerio = require('cheerio');

exports.getVersion = (req, res, next) => {
  request(
    {
      url: 'https://' + req.body.url + '/feed',
      rejectUnauthorized: false,
    },
    function(error, response, body) {
      if (error) {
        next(error);
      }
      if (!body) {
        res.send({ version: 'false' });
      } else if (body.lastIndexOf('https://wordpress.org/?') < 0) {
        res.send({ version: 'false' });
      } else {
        var currentVersion = body
          .substring(
            body.lastIndexOf('https://wordpress.org/?') + 25,
            body.lastIndexOf('https://wordpress.org/?') + 30,
          )
          .replace('</', '');
        var versions = [];
        request(
          {
            url: 'https://codex.wordpress.org/WordPress_Versions',
            rejectUnauthorized: false,
          },
          function(error, response, body) {
            if (!error) {
              var $ = cheerio.load(body);
              $(
                '#mw-content-text > table > tbody > tr > td > b > a',
              ).filter(function() {
                var data = $(this);
                versions.push(
                  data['0'].attribs.title
                    .replace('Version ', '')
                    .replace(' (page does not exist)', ''),
                );
              });
              console.log(versions.indexOf(currentVersion));
              var reasons = [];
              request(
                {
                  url:
                    'https://codex.wordpress.org/Version_' +
                    versions[versions.length - 1],
                  rejectUnauthorized: false,
                },
                function(error, response, body) {
                  if (error) {
                    next(error);
                  }
                  var $ = cheerio.load(body);
                  $('#mw-content-text > ol').filter(function() {
                    var data = $(this);
                    reasons = data.text().split("\n").filter(function(entry) { return entry.trim() != ''; });
                    res.json({
                      current: currentVersion,
                      latest: versions[versions.length - 1],
                      numberOfOutOfDate:
                        versions.length - versions.indexOf(currentVersion) - 1,
                      reasons: reasons,
                    });
                  });
                },
              );
            }
          },
        );
      }
    },
  );
};
