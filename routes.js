module.exports = app => {
    const pageSpeedAnalysisRouter = require('./api/pageSpeedAnalysis/pageSpeedAnalysisRouter');
    const ssllabsSiteSecurityTestRouter = require('./api/ssllabsSiteSecurityTest/ssllabsSiteSecurityTestRouter');
    const tenonADATestRouter = require('./api/tenonADATest/tenonADATestRouter');
    const brokenLinkTestRouter = require('./api/brokenLinkTest/brokenLinkTestRouter');
    const googleTagDetectorRouter = require('./api/googleTagDetector/googleTagDetectorRouter');
    const wpVersionFinderRouter = require('./api/wpVersionFinder/wpVersionFinderRouter');
    const drupalVersionFinderRouter = require('./api/drupalVersionFinder/drupalVersionFinderRouter');

    app.use('/psi', pageSpeedAnalysisRouter);
    app.use('/ssl', ssllabsSiteSecurityTestRouter);
    app.use('/ada', tenonADATestRouter);
    app.use('/links', brokenLinkTestRouter);
    app.use('/tags', googleTagDetectorRouter);
    app.use('/wpVersion', wpVersionFinderRouter);
    app.use('/drupalVersion', drupalVersionFinderRouter);
}