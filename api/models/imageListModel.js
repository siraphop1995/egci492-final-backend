var mongoose = require('mongoose')
var Schema = mongoose.Schema

var ImageSchema = new Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    tags: {

    },
    url: {
        type: String
    },
    type: {
        type: String
    },
    originalOwnerId: {
        type: String
    },
    originalOwnerUsername: {
        type: String
    },
    copyOwnerId: {
        type: String
    },
    copyOwnerUsername: {
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

module.exports = mongoose.model('Images', ImageSchema)