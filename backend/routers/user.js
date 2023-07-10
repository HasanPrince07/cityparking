const router = require('express').Router()
const registerC = require('../controllers/registercontroller')
const entryC = require('../controllers/entrycontroller')
const profileC = require('../controllers/profilecontroller')

const jwt = require('jsonwebtoken')
const jwtkey = 'cityparkingsecuritykey'

function verifytoken(req, res, next) {
    const token = req.headers.authorization
    const newtoken = token.split(' ')[1]
    if (newtoken !== 'null') {
        jwt.verify(newtoken, jwtkey, (err, valid) => {
            if (err) {
                res.send({
                    status: 401,
                    message: 'Please provide valid token'
                })
            } else {
                next()
            }
        })
    } else {
        res.send({
            status: 403,
            message: 'Please add token with header'
        })
    }
}

const multer = require('multer')
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/upload')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})
let upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 9 }
})

router.post('/signup', registerC.signup)
router.post('/login', registerC.login)

router.post('/addentry', verifytoken, entryC.addentry)

router.put('/updateprofile', verifytoken, upload.single('file'), profileC.updateprofile)
router.post('/showprofile', verifytoken, profileC.showprofile)


module.exports = router