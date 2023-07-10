const Entry = require('../models/entry')
const helper = require('../helper/messages')

exports.addentry = (req, res) => {
    const { oname, vnumber, vtype } = req.body
    try {
        let endate = new Date()
        const record = new Entry({ oname: oname, vnumber: vnumber, vtype: vtype, endate: endate })
        record.save()
        res.json({
            status: helper.status201,
            message: helper.message201
        })
    } catch (error) {
        res.json({
            status: helper.status400,
            message: helper.message400
        })
    }
}

exports.showadminentry = async (req, res) => {
    try {
        const record = await Entry.find()
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

exports.updatestatus = async (req, res) => {
    const id = req.params.id
    try {
        const record = await Entry.findById(id)
        const endate = record.endate
        const exdate = new Date()
        const totaltime = (exdate - endate) / (1000 * 60 * 60)
        let charge = null
        if (record.vtype == '2w') {
            charge = totaltime * 20
        } else if (record.vtype == '3w') {
            charge = totaltime * 30
        }
        else if (record.vtype == '4w') {
            charge = totaltime * 50
        }
        else if (record.vtype == 'hw') {
            charge = totaltime * 80
        }
        else {
            charge = totaltime * 100
        }
        let newcharge = Math.round(charge)
        if (totaltime <= 1) {
            newcharge = 20
        }
        let newttime = totaltime.toPrecision(2)
        let newstatus = null
        if (record.status == 'in') {
            newstatus = 'out'
        }
        await Entry.findByIdAndUpdate(id, { exdate: exdate, ttime: newttime, charge: newcharge, status: newstatus })
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

exports.showadminprintout = async (req, res) => {
    const id = req.params.id
    try {
        const record = await Entry.findById(id)
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

exports.deleteentry = async (req, res) => {
    const id = req.params.id
    try {
        await Entry.findByIdAndDelete(id)
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