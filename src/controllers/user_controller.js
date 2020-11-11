const { constants:{COOKIE_CONFIG} } = require('../constants')
const UserModel = require('../models/user_model')
const { signJwt, decryptData } = require('../utils/helper_functions')
const sharp = require('sharp')
const bcrypt = require('bcryptjs')


exports.CREATE = async (req, res) => {
    try {
        const { data } = req.body

        const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()
        const decryptedData = JSON.parse(decryptData(data))

        decryptedData.profilePicture = buffer

        const userData = new UserModel(decryptedData)
        const savedUserData = await userData.save()

        const token = signJwt(savedUserData)
        res.cookie('token', token, COOKIE_CONFIG)

        return res.status(201).send({ savedUserData })

    } catch (error) {
        return res.status(503).send({ error })
    }

}

exports.UPDATE = async (req, res) => {
    const { data } = req.body
    const id = req.params.id
    const decryptedData = JSON.parse(decryptData(data))
    const { oldPassword, password } = decryptedData

    delete decryptedData.oldPassword
    delete decryptedData.password

    try {
        const user = await UserModel.findById(id)
        
        if (oldPassword && password) {
            const isMatch = await bcrypt.compare(oldPassword, user.password)
            if (!isMatch) return res.status(406).send({ error: `Old Password Didn't Match` })
            decryptedData.password = await bcrypt.hash(password, 10)
        }

        if (req.file) {
            const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()
            decryptedData.profilePicture = buffer
        }

        const data = await UserModel.findByIdAndUpdate(id, decryptedData, { new: true })
        return res.status(200).send({ updatedUser: data })

    } catch (error) {
        console.log(error)
        return res.status(503).send({ error })
    }
}

exports.READ = async (req, res) => {
    try {
        const usersData = await UserModel.find({})
        if (userData) return res.status(200).send({ usersData })
        return res.status(404).send({ error: 'No Such User' })
    } catch (error) {
        console.log(error)
        return res.status(503).send({ error })
    }
}


exports.GET_PIC = async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id)
        if (!user || !user.profilePicture) return res.status(404).send({ error: 'No Picture Available' })
        res.set('Content-type', 'image/png')
        res.send(user.profilePicture)
    } catch (error) {
        console.log(error)
        return res.status(503).send({ error })
    }
}

exports.READ_SINGLE = async (req, res) => {
    try {
        const id = req.params.id
        const userData = await UserModel.findById(id)
        if (!userData) return res.status(404).send({ message: 'No Such User' })
        return res.status(200).send({ userData })
    } catch (error) {
        console.log(error)
        return res.status(53).send({ error })
    }
}