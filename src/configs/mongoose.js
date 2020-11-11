const mongoose = require('mongoose')
const { constants:{MONGO_DB_URI} } = require('../constants')

const config = {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
}

const checkConnection = err => err ? console.log('MongoDB Connection Error') : console.log('MongoDb Connected')

mongoose.connect(MONGO_DB_URI, config, checkConnection)

module.exports = mongoose
