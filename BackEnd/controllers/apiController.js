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
    console.log(req.body)
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
    const token = req.cookies.jwt;
    if (!token) {
        
        return res.sendStatus(403);
    }
    jwt.verify(token, "keep it spicy", (err, decoded) => {
        if (err) {
            return res.sendStatus(403);
        }
        req.user = decoded.userInfo;
        next();
    });

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
    res.sendStatus(200)
}

async function getUser(req, res) {
    res.json(req.user)
}


module.exports = {signUp, logIn, verifyToken, getInfo, checkLoggedIn, logOut, getUser}