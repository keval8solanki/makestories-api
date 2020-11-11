const { constants: { JWT_SECRET, ENCRYPTION_SECRET } } = require('../constants')

const jwt = require('jsonwebtoken')
const cryptojs = require('crypto-js')

exports.signJwt = ({ _id, firstName }) => jwt.sign({ _id: _id.toString(), firstName }, JWT_SECRET)

exports.verifyJwt = token => jwt.verify(token, JWT_SECRET)

exports.encryptData = (data) => cryptojs.AES.encrypt(data, ENCRYPTION_SECRET_KEY).toString()

exports.decryptData = (ciphertext) => cryptojs.AES.decrypt(ciphertext, ENCRYPTION_SECRET).toString(cryptojs.enc.Utf8)
