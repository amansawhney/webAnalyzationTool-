const ssllabsSiteSecurityTestRouter = require("express").Router();
const ssllabsSiteSecurityTestController = require("./ssllabsSiteSecurityTestController");
ssllabsSiteSecurityTestRouter.post("/", ssllabsSiteSecurityTestController.getSSL);

module.exports = ssllabsSiteSecurityTestRouter;