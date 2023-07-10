const Userregister = require('../models/userregister')
const helper = require('../helper/messages')

exports.updateprofile = async (req, res) => {
    const img = req.file.filename
    const { fname, lname, gusername, email } = req.body
    try {
        const record = await Userregister.findOne({ username: gusername })
        const id = record.id
        await Userregister.findByIdAndUpdate(id, { fname: fname, lname: lname, email: email, img: img })
        res.json({
            status: helper.status200,
            message: helper.message200
        })
    } catch (error) {
        res.json({
            status: helper.status500,
            message: helper.message500
        })
    }
}

exports.showprofile = async (req, res) => {
    const { gusername } = req.body
    try {
        const record = await Userregister.findOne({ username: gusername })
        res.json({
            status: helper.status200,
            message: helper.message200,
            bRecord: record
        })
    } catch (error) {
        res.json({
            status: helper.status500,
            message: helper.message500,
        })
    }
}