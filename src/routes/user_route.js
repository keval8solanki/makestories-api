const express = require('express')
const router = new express.Router()
// const verifyPermission = require('../middleware/verifyPermission')
const {
	CREATE,
	UPDATE,
	READ,
	READ_SINGLE,
	GET_PIC,
} = require('../controllers/user_controller')
const { uploadMiddleware, checkAuthentication } = require('../middlewares')

// --- BASIC CRUD ---
router.post('/user', uploadMiddleware, CREATE)
router.patch('/user/:id', checkAuthentication, uploadMiddleware, UPDATE)

router.get('/users',  READ)
router.get('/user/:id',checkAuthentication, READ_SINGLE)
router.get('/user/:id/pic',checkAuthentication, GET_PIC)

module.exports = router
