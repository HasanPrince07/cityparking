const Userregister = require('../models/userregister')
const helper = require('../helper/messages')

const jwt = require('jsonwebtoken')
const jwtkey = 'cityparkingsecuritykey'

exports.signup = async (req, res) => {
    const { username, password } = req.body
    try {
        const recordcheck = await Userregister.findOne({ username: username })
        if (recordcheck == null) {
            const record = new Userregister({ username: username, password: password })
            record.save()
            res.json({
                status: helper.status201,
                message: helper.message201,
                bRecord: record
            })
        } else {
            res.json({
                status: helper.status400,
                message: 'already',
                bRecord: recordcheck,
            })
        }
    } catch (error) {
        res.json({
            status: helper.status400,
            message: helper.message400,
        })
    }
}

exports.login = async (req, res) => {
    const { username, password } = req.body
    try {
        const logincheck = await Userregister.findOne({ username: username })
        if (logincheck !== null) {
            if (logincheck.password == password) {
                jwt.sign({ logincheck }, jwtkey, { expiresIn: '2h' }, (err, token) => {
                    if (err) {
                        res.json({ message: 'wrong' })
                    }
                    res.json({
                        status: helper.status200,
                        message: helper.message200,
                        bRecord: logincheck,
                        auth: token
                    })
                })
            } else {
                res.json({
                    status: helper.status400,
                    message: helper.message400
                })
            }
        } else {
            res.json({
                status: helper.status400,
                message: helper.message400
            })
        }
    } catch (error) {
        res.json({
            status: helper.status500,
            message: helper.message500
        })
    }
}