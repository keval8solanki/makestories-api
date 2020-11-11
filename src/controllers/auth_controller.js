const bcrypt = require('bcryptjs')
const { constants: { ENCRYPTION_SECRET,  COOKIE_CONFIG } } = require('../constants')

const UserModel = require('../models/user_model')
const { verifyJwt, decryptData, signJwt } = require('../utils/helper_functions')

exports.LOGIN = async (req, res) => {
    const { data } = req.body
    const creds = JSON.parse(decryptData(data, ENCRYPTION_SECRET))
    const { email, password } = creds
    try {
        const userData = await UserModel.findOne({ email })
        if (!userData) return res.status(404).send({ error: 'No User Found' })

        const isMatch = await bcrypt.compare(password, userData.password)
        if (!isMatch) return res.status(403).send({ error: 'Invalid Credentials' })

        const token = signJwt(userData)
        res.cookie('token', token, COOKIE_CONFIG)
        return res.status(200).send({ userData })

    } catch (error) {
        return res.status(503).send({ error })
    }
}

exports.LOGOUT = async (req, res) => {
    res.cookie('token', 'logout', {
        httpOnly: true,
        ...COOKIE_CONFIG,
    })

    res.status(200).end()
}

exports.VERIFY = async (req, res) => {
    const { token } = req.cookies
    try {
        const { _id } = verifyJwt(token)
        const userData = await UserModel.findById(_id)
        if (!userData) return res.status(404).send({ error: 'No such user found' })
        return res.send({ userData })
    } catch (error) {
        return res.status(403).send({ error })
    }
}
