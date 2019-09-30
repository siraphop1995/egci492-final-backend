var mongoose = require('mongoose')
var Schema = mongoose.Schema

var AlbumSchema = new Schema({
    name: {
        unique: true,
        type: String
    },
    imageData: {

    },
    type: {
        type: String
    },
    ownerId: {
        type: String
    },
    ownerUsername: {
        type: String
    },
    description: {
        type: String
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    modifiedDate: {
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model('Albums', AlbumSchema)