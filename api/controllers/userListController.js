'use strict'
var mongoose = require('mongoose')
var bcrypt = require('bcrypt')
User = mongoose.model('Users')
var jwt = require('jsonwebtoken')

exports.listAllUsers = function (req, res) {
    ensureToken(req, res)

    jwt.verify(req.token, req.headers.userid, function (err, data) {
        if (err) {
            res.sendStatus(403);
        } else {
            //if Authenticated
            var query = { sort: { firstName: 1 } }
            User.find({}, null, query, function (err, user) {
                if (err) throw err
                //console.log(user)
                res.json(user)
            })
            //Fin
        }
    });

}

exports.createAUser = function (req, res) {

            var newUser = new User(req.body)
            newUser.password = bcrypt.hashSync(req.body.password, 10)
            newUser.save(function (err, tuser) {
                if (err) {
                    return res.status(400).json({
                        title: 'error',
                        error: 'username already exist'
                    })
                }

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
                res.json(user)
            })
}

exports.readAUser = function (req, res) {
    ensureToken(req, res)

    jwt.verify(req.token, req.headers.userid, function (err, data) {
        if (err) {
            res.sendStatus(403);
        } else {
            //if Authenticated
            //console.log(req.params.userId)
            User.findById(req.params.userId, function (err, user) {
                if (err) throw err
                res.json(user)
            })
            //Fin
        }
    });

}

exports.deleteAUser = function (req, res) {
    ensureToken(req, res)

    jwt.verify(req.token, req.headers.userid, function (err, data) {
        if (err) {
            res.sendStatus(403);
        } else {
            //if Authenticated
            //console.log(req.params.userId)
            console.log("waiting: " + req.params.userId)
            User.findByIdAndRemove(req.params.userId, function (err, user) {
                if (err) throw err
                const response = {
                    message: "Delete user id: " + req.params.userId + " successfully",
                    id: user._id
                }
                console.log("deleted")
                res.json(response)
            })
            //Fin
        }
    });

}

exports.updateAUser = function (req, res) {
 
    ensureToken(req, res)

    jwt.verify(req.token, req.headers.userid, function (err, data) {
        if (err) {
            res.sendStatus(403);
        } else {
            //if Authenticated
            console.log(req.params.userId)
            var newUser = {}
            newUser = req.body
            console.log(newUser)
            User.findByIdAndUpdate(req.params.userId, newUser, { new: true }, function (err, user) {
                if (err) throw err
                console.log(user)
                res.json(user)
            })
            //Fin
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



