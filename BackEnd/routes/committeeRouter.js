const express = require("express")
const committeeRouter = express.Router()
const apiController = require("../controllers/apiController.js")

committeeRouter.post("/", apiController.verifyToken, apiController.getCommittee)

module.exports = committeeRouter