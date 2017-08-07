const pageSpeedAnalysisRouter = require("express").Router();
const pageSpeedAnalysisController = require("./pageSpeedAnalysisController");
pageSpeedAnalysisRouter.post("/", pageSpeedAnalysisController.getPSI);

module.exports = pageSpeedAnalysisRouter;