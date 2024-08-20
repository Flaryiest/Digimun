const express = require("express")
const committeeRouter = express.Router()
const apiController = require("../controllers/apiController.js")

committeeRouter.post("/countries/add", apiController.verifyToken, apiController.addCountry)

committeeRouter.delete("/countries/remove", apiController.verifyToken, apiController.removeCountry)

committeeRouter.put("/countries/toggle", apiController.verifyToken, apiController.toggleAttribute)

committeeRouter.post("/", apiController.verifyToken, apiController.getCommittee)



module.exports = committeeRouter