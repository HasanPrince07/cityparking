const mongoose = require('mongoose')

const entrySchema = mongoose.Schema({
    oname: String,
    vnumber: String,
    vtype: String,
    charge: Number,
    ttime: Number,
    status: { type: String, default: 'in' },
    endate: Date,
    exdate: Date,
})

module.exports = mongoose.model('entry', entrySchema)