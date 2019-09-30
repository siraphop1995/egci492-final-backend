var mongoose = require('mongoose')
var Schema = mongoose.Schema

var UserSchema = new Schema({
    username: {
        unique: true,
        type: String
    },
    password: {
        type: String
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String
    },
    userAlbumData: {

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

UserSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Users', UserSchema)