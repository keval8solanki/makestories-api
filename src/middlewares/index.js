const multer = require('multer')
const { verifyJwt } = require('../utils/helper_functions')

exports.uploadMiddleware = multer({
    dest: '',
    limits: {
        fieldSize: 5000000 //5MB limit
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) return cb(new Error('Please upload an Image file'))
        cb(undefined, true)
    }
}).single('profile_pic')


exports.checkAuthentication = async (req, res, next) => {
    const { token } = req.cookies
    try {
        const decoded = verifyJwt(token)
        if (!decoded) return res.status(400).send({ error: 'Unauthorized' })
        next()
    } catch (e) {
        res.status(401).send({ error: 'Not Allowed To This Route' })
    }
}