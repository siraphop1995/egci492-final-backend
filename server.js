//server.js
//npm install express axios mongoose
var express = require('express')
bodyParser = require('body-parser')
mongoose = require('mongoose')
uniqueValidator = require('mongoose-unique-validator');
var cors = require('cors')

app = express()
port = process.env.PORT || 3000

User = require('./api/models/userListModel.js')
Album = require('./api/models/albumListModel.js')
Image = require('./api/models/imageListModel.js')
mongoose.Promise = global.Promise
mongoose.connect('mongodb+srv://admin:admin@cluster0-yejh3.gcp.mongodb.net/Final_Project?retryWrites=true&w=majority', function(error){
    if(error) throw error
    console.log('Successfully connected');
})

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json())

var routes = require('./api/routes/routes.js')
routes(app)

app.listen(port)

console.log('Server started on : '+ port)
