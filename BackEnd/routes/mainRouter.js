const express = require("express")
const mainRouter = express.Router()

mainRouter.get("/", function(req, res) {
    res.send("Recieved")
})

module.exports = mainRouter