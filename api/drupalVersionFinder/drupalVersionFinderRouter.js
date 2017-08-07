const drupalVersionFinderRouter = require("express").Router();
const drupalVersionFinderController = require("./drupalVersionFinderController");
drupalVersionFinderRouter.post("/", drupalVersionFinderController.getDropalVersion);

module.exports = drupalVersionFinderRouter;