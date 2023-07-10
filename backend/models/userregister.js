const mongoose = require('mongoose')

const userregisterSchema = mongoose.Schema({
    username: String,
    password: String,
    fname: String,
    lname: String,
    email: String,
    img: String
})

module.exports = mongoose.model('userregister', userregisterSchema)