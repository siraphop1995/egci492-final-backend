
'use strict'
module.exports = function (app) {
    var authenList = require('../controllers/authenticationListController')
    var userList = require('../controllers/userListController')
    var albumList = require('../controllers/albumListController')
    var imageList = require('../controllers/imageListController')


    app.route('/authentication')
        .get(authenList.authentication)

    app.route('/signin')
        .post(authenList.signin)

    app.route('/signup')
        .post(userList.createAUser)

    app.route('/users')
        .get(userList.listAllUsers)

    app.route('/users/:userId')
        .get(userList.readAUser)
        .post(userList.updateAUser)
        .delete(userList.deleteAUser)

    app.route('/albums')
        .get(albumList.listAllAlbums)
        .post(albumList.createAAlbum)

    app.route('/user_albums/:userId')
        .get(albumList.listUserAlbums)

    app.route('/albums/:albumId')
        .get(albumList.readAAlbum)
        .post(albumList.updateAAlbum)
        .delete(albumList.deleteAAlbum)

    app.route('/images')
        .get(imageList.listAllImages)
        .post(imageList.createAImage)

    app.route('/new_images')
        .get(imageList.listNewImages)


    app.route('/images/:imageId')
        .get(imageList.readAImage)
        .post(imageList.updateAImage)
        .delete(imageList.deleteAImage)

    app.route('/test')
        .get(albumList.listMainAlbumsImage)

}