const express = require("express")
const committeeRouter = express.Router()
const apiController = require("../controllers/apiController.js")

committeeRouter.post("/countries/add", apiController.verifyToken, apiController.addCountry)

committeeRouter.delete("/countries/remove", apiController.verifyToken, apiController.removeCountry)

committeeRouter.put("/countries/toggle", apiController.verifyToken, apiController.toggleAttribute)

committeeRouter.get("/motionTypes", apiController.verifyToken, apiController.getMotionTypes)

committeeRouter.delete("/motion", apiController.verifyToken, apiController.deleteMotion)

committeeRouter.post("/motion", apiController.verifyToken, apiController.createMotion)

committeeRouter.post("/caucus", apiController.verifyToken, apiController.openMotion)

committeeRouter.put("/mod/add", apiController.verifyToken, apiController.addCountryToCaucus)

committeeRouter.delete("/mod", apiController.verifyToken, apiController.deleteMod)

committeeRouter.put("/mod", apiController.verifyToken, apiController.getModInfo)

committeeRouter.put("/unmod", apiController.verifyToken, apiController.getUnmod)

committeeRouter.put("/mods", apiController.verifyToken, apiController.getMods)

committeeRouter.post("/", apiController.verifyToken, apiController.getCommittee)


module.exports = committeeRouter