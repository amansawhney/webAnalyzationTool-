module.exports = app => {
    const pageSpeedAnalysisRouter = require('./api/pageSpeedAnalysis/pageSpeedAnalysisRouter');
    const ssllabsSiteSecurityTestRouter = require('./api/ssllabsSiteSecurityTest/ssllabsSiteSecurityTestRouter');
    const tenonADATestRouter = require('./api/tenonADATest/tenonADATestRouter');
    const brokenLinkTestRouter = require('./api/brokenLinkTest/brokenLinkTestRouter');
    const googleTagDetectorRouter = require('./api/googleTagDetector/googleTagDetectorRouter');
    const wpVersionFinderRouter = require('./api/wpVersionFinder/wpVersionFinderRouter');
    const drupalVersionFinderRouter = require('./api/drupalVersionFinder/drupalVersionFinderRouter');

    app.use('/api/psi', pageSpeedAnalysisRouter);
    app.use('/api/ssl', ssllabsSiteSecurityTestRouter);
    app.use('/api/ada', tenonADATestRouter);
    app.use('/api/links', brokenLinkTestRouter);
    app.use('/api/tags', googleTagDetectorRouter);
    app.use('/api/wpVersion', wpVersionFinderRouter);
    app.use('/api/drupalVersion', drupalVersionFinderRouter);
}