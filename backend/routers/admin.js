const router = require('express').Router()
const registerC = require('../controllers/registercontroller')
const entryC = require('../controllers/entrycontroller')

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

router.post('/login', registerC.login)

router.get('/showadminentry', verifytoken, entryC.showadminentry)
router.put('/updatestatus/:id', verifytoken, entryC.updatestatus)
router.get('/showadminprintout/:id', verifytoken, entryC.showadminprintout)
router.delete('/deleteentry/:id', verifytoken, entryC.deleteentry)

module.exports = router