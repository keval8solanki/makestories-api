const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const { constants: { ORIGIN } } = require('../constants')

const app = express()

app.use(cookieParser())
app.use(
	cors({
		origin: ORIGIN,
		credentials: true,
	})
)
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

module.exports = app
