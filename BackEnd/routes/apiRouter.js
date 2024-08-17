const express = require("express")
const apiRouter = express.Router()
const apiController = require("../controllers/apiController.js")

apiRouter.post("/signup", apiController.signUp)

apiRouter.post("/login", apiController.logIn)

apiRouter.get("/getInfo", apiController.verifyToken, apiController.getInfo)

apiRouter.get("/log-out", apiController.verifyToken, apiController.logOut)

module.exports = apiRouter