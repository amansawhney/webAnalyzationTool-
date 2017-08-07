const tenonADATestCRouter = require("express").Router();
const tenonADATestController = require("./tenonADATestController");
tenonADATestCRouter.post("/", tenonADATestController.getADA);

module.exports = tenonADATestCRouter