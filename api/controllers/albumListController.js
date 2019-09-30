'use strict'
var mongoose = require('mongoose')
Album = mongoose.model('Albums')
var jwt = require('jsonwebtoken')

exports.listAllAlbums = function (req, res) {

    ensureToken(req, res)

    jwt.verify(req.token, req.headers.userid, function (err, data) {
        if (err) {
            res.sendStatus(403);
        } else {
            //if Authenticated
            var query = { sort: { albumName: 1 } }
            Album.find({}, null, query, function (err, album) {
                if (err) throw err
                //console.log(album)
                res.json(album)
            })
            //Fin
        }
    });


}

exports.listMainAlbumsImage = function (req, res) {
    ensureToken(req, res)

    jwt.verify(req.token, req.headers.userid, function (err, data) {
        if (err) {
            res.sendStatus(403);
        } else {
            //if Authenticated
            var query = { sort: { albumName: 1 } }
            Album.find({ type: "main" }, null, query, function (err, album) {
                if (err) throw err
                //console.log(album)
                var arr = []
                for (var i = 0; i < album.length; i++) {
                    for (var j = 0; j < album[i].imageData.length; j++) {
                        arr.push(album[i].imageData[j])
                    }
                }
                arr.sort(function (a, b) {
                    return a.id - b.id
                });
                res.json(arr)

            })
            //Fin
        }
    });

}

exports.listUserAlbums = function (req, res) {
    ensureToken(req, res)

    jwt.verify(req.token, req.headers.userid, function (err, data) {
        if (err) {
            res.sendStatus(403);
        } else {
            //if Authenticated
            var query = { sort: { albumName: 1 } }
            console.log(req.params.userId)
            Album.find({ ownerId: req.params.userId }, null, query, function (err, album) {
                if (err) throw err
                //console.log(album)
                res.json(album)
            })
            //Fin
        }
    });

}

exports.createAAlbum = function (req, res) {
            var newAlbum = new Album(req.body)
            newAlbum.save(function (err, album) {
                if (err) {
                    return res.status(400).json({
                        title: 'error',
                        error: 'Album name duplicated!!'
                    })
                }
                res.json(album)
            })
}

exports.readAAlbum = function (req, res) {
    ensureToken(req, res)

    jwt.verify(req.token, req.headers.userid, function (err, data) {
        if (err) {
            res.sendStatus(403);
        } else {
            //if Authenticated
            //console.log(req.params.albumId)
            Album.findById(req.params.albumId, function (err, album) {
                if (err) throw err
                res.json(album)
            })
            //Fin
        }
    });

}

exports.deleteAAlbum = function (req, res) {
    ensureToken(req, res)

    jwt.verify(req.token, req.headers.userid, function (err, data) {
        if (err) {
            res.sendStatus(403);
        } else {
            //if Authenticated
            //console.log(req.params.albumId)
            console.log("waiting: " + req.params.albumId)
            Album.findByIdAndRemove(req.params.albumId, function (err, album) {
                if (err) throw err
                const response = {
                    message: "Delete album id: " + req.params.albumId + " successfully",
                    id: album._id
                }
                console.log("deleted")
                res.json(response)
            })
            //Fin
        }
    });

}

exports.updateAAlbum = function (req, res) {
    ensureToken(req, res)

    jwt.verify(req.token, req.headers.userid, function (err, data) {
        if (err) {
            res.sendStatus(403);
        } else {
            //if Authenticated
            console.log(req.params.albumId)
            var newAlbum = {}
            newAlbum = req.body
            console.log(newAlbum)
            Album.findByIdAndUpdate(req.params.albumId, newAlbum, { new: true }, function (err, album) {
                if (err) throw err
                console.log(album)
                res.json(album)
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