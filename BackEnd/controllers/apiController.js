require("dotenv").config()
const db = require("../db/queries")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const fs = require("fs")



async function signUp(req, res) {
    bcrypt.hash(req.body.password, 10, async function(err, hash) {
        const response = await db.signUp(req.body.email, hash)
        if (response == 'An account associated with this email already exists') {
            res.status(400).send(response)
        }
        else {
            res.status(200).send()
        }
    });
    
}

async function logIn(req, res) {
    if (req.body.email == '' || req.body.password == '') {
        res.sendStatus(400)
    }
    else {
        let userInfo = await db.login(req.body.email)
        if (userInfo == null) {
            res.sendStatus(400)
        }

        else {
            bcrypt.compare(req.body.password, userInfo.password, function(err, result) {
                if (err) {
                    res.sendStatus(400)
                }
                else {
                    jwt.sign({userInfo}, process.env.JWT_SECRET, {expiresIn: "10000s"}, (err, token) => {
                        if (err) {
                            res.sendStatus(400)
                        }
                        res.status(200).cookie("jwt", token, {
                            sameSite:'None',
                            secure: true, 
                            path: '/',
                            httpOnly: true,
                            expires: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
                        }).send("cookie")
                    })
                }
                
            })
        }
    }
}

async function getInfo(req, res) {
    res.send("Recieved")
}

async function verifyToken(req, res, next) {
    const token = req.cookies.jwt
    if (!token) {
        res.redirect("http://localhost:5173/onboard")
    }
    else {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.sendStatus(403);
        }
        req.user = decoded.userInfo;
        next()
        })
    }

}

async function checkLoggedIn(req, res) {
    const token = req.cookies.jwt
    if (token) {
        res.sendStatus(200)
    }
    else {
        res.sendStatus(202)
    }
}

async function logOut(req, res) {
    res.clearCookie("jwt")
    res.sendStatus(200) //change to redirect later using navigate in react currently
}

async function getUser(req, res) {
    res.json(req.user)
}

async function getCommittees(req, res) {
    const committees = await db.getCommittees(req.user.id)
    res.json(committees)
}

async function createCommittee(req, res) {
    const response = await db.createCommittee(req.body.name, req.body.topic, req.body.conference, req.user.id)
    if (response == "Duplicate Committee") {
        res.sendStatus(400)
    }
    else {
        res.sendStatus(200)
    }
}

async function getPermissions(req, res) {
    const response = await db.getPermissions(req.body.committeeID, req.user.id)
    if (response) {
        res.json(response)
    }
    else {
        res.sendStatus(403)
    }
}

async function getCommittee(req, res) {
    const response = await db.getCommittee(req.body.committeeID)
    if (response) {
        res.json(response)
    }
    else {
        res.sendStatus(403)
    }
}

async function getCountries(req, res) {
    const countries = await db.getCountries()
    if (countries) {
        res.json(countries)
    }
    else {
        res.sendStatus(403)
    }
}

async function addCountry(req, res) {
    const response = await db.addCountry(req.body.committeeID, req.body.country, req.body.countryCode)
    if (response) {
        res.sendStatus(200)
    }
    else {
        console.log(response)
        res.sendStatus(400)
    }
}

async function removeCountry(req, res) {
    const response = await db.removeCountry(req.body.profileID)
    if (response) {
        res.sendStatus(200)
    }
    else (
        res.sendStatus(400)
    )
}

async function toggleAttribute(req, res) {
    if (req.body.field == "present") {
        const response = db.togglePresent(req.body.profileID, req.body.status)
        if (response) {
            res.sendStatus(200)
        }
        else {
            res.sendStatus(400)
        }
        
    }
    else if (req.body.field == "voting") {
        const response = db.toggleVoting(req.body.profileID, req.body.status)
        if (response) {
            res.sendStatus(200)
        }
        else {
            res.sendStatus(400)
        }
    }
    else {
        res.sendStatus(400)
    }
}

async function getMotionTypes(req, res) {
    const response = await db.getMotionTypes()
    if (response) {
        res.json(response)
    }
    else {
        res.sendStatus(400)
    }
}

async function createMotion(req, res) {
    console.log(req.body)
    let status = false
    if (["open_moderated_caucus", "extend_moderated_caucus"].includes(req.body.motionType)) {
        const response = await db.createModMotion(req.body.committeeID, req.body.profileID, req.body.motionType, req.body.name, req.body.time, req.body.country, req.body.speakingTime)
        status = response
    }
    else {
        const response = await db.createUnModMotion(req.body.committeeID, req.body.profileID, req.body.motionType, req.body.time, req.body.country)
        status = response
    }
    if (status) {
        res.sendStatus(200)
    }
    else {
        res.sendStatus(400)
    }
}

async function deleteMotion(req, res) {
    const response = await db.deleteMotion(req.body.motionID)
    if (response) {
        res.sendStatus(200)
    }
    else {
        res.sendStatus(400)
    }
}

async function openMotion(req, res) {
    if (["open_unmoderated_caucus", "extend_unmoderated_caucus"].includes(req.body.motion.motionType)) {
        console.log(req.body.motion.committeeId)
        const unmod = await db.openUnmodMotion(req.body.motion.committeeId, req.body.motion.time)
        if (unmod) {
            res.json({motionType: "open_unmoderated_caucus"})
        }
        else {
            res.sendStatus(400)
        }
    }
    else {
        const caucus = await db.openMotion(req.body.motion)
        if (caucus) {
            res.status(200).json(caucus)
        }
        else {
            res.sendStatus(400)
        }
    }
}

async function getModInfo(req, res) {
    const response = await db.getModInfo(req.body.modID)
    if (response) {
        res.json(response)
    }
    else {
        res.sendStatus(400)
    }
}

async function getMods(req, res) {
    const mods = await db.getMods(req.body.committeeID)
    if (mods) {
        res.json(mods)
    }
    else {
        res.sendStatus(400)
    }
}

async function getUnmod(req, res) {
    const unmod = await db.getUnmod(req.body.committeeID)
    if (unmod) {
        res.status(200).json(unmod)
    }
    else {
        res.sendStatus(400)
    }
}

async function deleteMod(req, res) {
    const response = await db.deleteMod(req.body.modID)
    if (response) {
        res.sendStatus(200)
    }
    else {
        res.sendStatus(400)
    }
}

async function addCountryToCaucus(req, res) {
    console.log("test")
    const response = await db.addCountryToCaucus(req.body.modID, req.body.committeeID, req.body.country)
    if (response) {
        res.sendStatus(200)
    }
    else {
        res.sendStatus(400)
    }
}

module.exports = {signUp, logIn, verifyToken, getInfo, checkLoggedIn, logOut, getUser, getCommittees, createCommittee, getPermissions, getCommittee, getCountries, addCountry, removeCountry, toggleAttribute, getMotionTypes, createMotion, deleteMotion, openMotion, getModInfo, getMods, getUnmod, deleteMod, addCountryToCaucus}