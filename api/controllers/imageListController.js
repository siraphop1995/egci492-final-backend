'use strict'
var mongoose = require('mongoose')
Image = mongoose.model('Images')
var jwt = require('jsonwebtoken')

exports.listAllImages = function (req, res) {
    ensureToken(req, res)

    jwt.verify(req.token, req.headers.userid, function (err, data) {
        if (err) {
            res.sendStatus(403);
        } else {
            //if Authenticated
            var query = { sort: { imageName: 1 } }
            Image.find({}, null, query, function (err, image) {
                if (err) throw err
                //console.log(image)
                res.json(image)
            })
            //Fin
        }
    });

}

exports.listNewImages = function (req, res) {
    ensureToken(req, res)

    jwt.verify(req.token, req.headers.userid, function (err, data) {
        if (err) {
            res.sendStatus(403);
        } else {
            //if Authenticated
            var query = { sort: { createdDate: -1 } }
            Image.find({ type: "original" }, null, query, function (err, image) {
                if (err) throw err
                //console.log(image)
                res.json(image)
            })
            //Fin
        }
    });

}


exports.listUserImages = function (req, res) {
    ensureToken(req, res)

    jwt.verify(req.token, req.headers.userid, function (err, data) {
        if (err) {
            res.sendStatus(403);
        } else {
            //if Authenticated
            var query = { sort: { imageName: 1 } }
            console.log(req.params.userId)
            Image.find({ ownerId: req.params.userId }, null, query, function (err, image) {
                if (err) throw err
                //console.log(image)
                res.json(image)
            })
            //Fin
        }
    });

}

exports.createAImage = function (req, res) {
    ensureToken(req, res)

    jwt.verify(req.token, req.headers.userid, function (err, data) {
        if (err) {
            res.sendStatus(403);
        } else {
            //if Authenticated
            var newImage = new Image(req.body)
            newImage.save(function (err, image) {
                if (err) throw err
                res.json(image)
            })
            //Fin
        }
    });

}

exports.readAImage = function (req, res) {
    ensureToken(req, res)

    jwt.verify(req.token, req.headers.userid, function (err, data) {
        if (err) {
            res.sendStatus(403);
        } else {
            //if Authenticated
            //console.log(req.params.imageId)
            Image.findById(req.params.imageId, function (err, image) {
                if (err) throw err
                res.json(image)
            })
            //Fin
        }
    });

}

exports.deleteAImage = function (req, res) {
    ensureToken(req, res)

    jwt.verify(req.token, req.headers.userid, function (err, data) {
        if (err) {
            res.sendStatus(403);
        } else {
            //if Authenticated
            //console.log(req.params.imageId)
            console.log("waiting: " + req.params.imageId)
            Image.findByIdAndRemove(req.params.imageId, function (err, image) {
                if (err) throw err
                const response = {
                    message: "Delete image id: " + req.params.imageId + " successfully",
                    id: image._id
                }
                console.log("deleted")
                res.json(response)
            })
            //Fin
        }
    });

}

exports.updateAImage = function (req, res) {
    ensureToken(req, res)

    jwt.verify(req.token, req.headers.userid, function (err, data) {
        if (err) {
            res.sendStatus(403);
        } else {
            //if Authenticated
            console.log(req.params.imageId)
            var newImage = {}
            newImage = req.body
            console.log(newImage)
            Image.findByIdAndUpdate(req.params.imageId, newImage, { new: true }, function (err, image) {
                if (err) throw err
                console.log(image)
                res.json(image)
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