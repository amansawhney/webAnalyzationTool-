const brokenLinkTestRouter = require("express").Router();
const brokenLinkTestController = require("./brokenLinkTestController");
brokenLinkTestRouter.post("/", brokenLinkTestController.getBrokenLinks);

module.exports = brokenLinkTestRouter;