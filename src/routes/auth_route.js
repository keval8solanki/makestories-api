const express = require('express')
const router = new express.Router()
const {  VERIFY, LOGIN, LOGOUT } = require('../controllers/auth_controller')

router.post('/login', LOGIN)
router.post('/logout', LOGOUT)
router.post('/verify', VERIFY)

module.exports = router
