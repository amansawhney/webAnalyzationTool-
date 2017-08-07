const wpVersionFinderRouter = require("express").Router();
const wpVersionFinderController = require("./wpVersionFinderController");
wpVersionFinderRouter.post("/", wpVersionFinderController.getVersion);

module.exports = wpVersionFinderRouter