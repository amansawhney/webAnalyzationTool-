const googleTagDetectorRouter = require("express").Router();
const googleTagDetectorController = require("./googleTagDetectorController");
googleTagDetectorRouter.post("/", googleTagDetectorController.getGADATA);

module.exports = googleTagDetectorRouter;