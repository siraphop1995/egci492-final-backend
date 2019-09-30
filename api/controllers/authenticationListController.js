'use strict'
var mongoose = require('mongoose')
var bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken')

exports.signin = function (req, res) {
    User.findOne({ username: req.body.username }, function (err, tuser) {
        if (err) throw err
        if (!tuser) {
            return res.status(401).json({ message: "user does not exist" })
        }
        if(!bcrypt.compareSync(req.body.password, tuser.password)) {
            return res.status(401).json({ message: "password wrong" })
        }
        
        let token = jwt.sign({ user: tuser.id }, tuser.id, {
            expiresIn: '7d' // expires in 24 hours
        });
        console.log(tuser.id)
        console.log(token)
        let auser = {
            _id: tuser._id,
            username: tuser.username,
            firstName: tuser.firstName,
            lastName: tuser.lastName,
            email: tuser.email,
            userAlbumId: tuser.userAlbumId,
            createdDate: tuser.createdDate,
            modifiedDate: tuser.modifiedDate
        }
        var user = auser;
        return res.status(200).json({ 
            user,
            message: 'Authenticated! Use this token in the "Authorization" header',
            token: token
        })

    })
}

exports.authentication = function (req, res) {
     ensureToken(req, res)
    // console.log(req.headers.userid)
    jwt.verify(req.token, req.headers.userid, function (err, data) {
        if (err) {
            res.sendStatus(403);
        } else {
            res.sendStatus(200);
        }
    });

}


function ensureToken(req, res, next) {
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        req.token = bearerToken;
    } else {
        return 403;
    }
}