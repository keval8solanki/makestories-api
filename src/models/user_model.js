const mongoose = require('../configs/mongoose')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			required: true,
		},
		lastName: {
			type: String,
			required: true,
		},

		email: {
			type: String,
			required: true,
			unique: true
		},

		password: {
			type: String,
			required: true
		},

		age: {
			type: Number,
			required: true,
		},

		phoneNumber: {
			type: String,
			required: true,
			unique: true,
		},

		address: {
			street: {
				type: String,
				required: true
			},
			city: {
				type: String,
				required: true
			},
			state: {
				type: String,
				required: true
			},
			zipcode: {
				type: String,
				required: true
			},
			country: {
				type: String,
				required: true
			}
		},

		profilePicture: {
			type: Buffer,
		},
	},

	{
		timestamps: true,
	}
)

// Excluding Password in res
UserSchema.methods.toJSON = function () {
	const user = this
	const userObject = user.toObject()

	delete userObject.password
	delete userObject.profilePicture

	return userObject
}

// Oneway hashing password before save or modify
UserSchema.pre('save', async function (next) {
	const user = this
	try {
		if (user.isModified('password')) user.password = await bcrypt.hash(user.password, 10)
	} catch (error) {
		return res.status(400).send({ error })
	}

	next()
})

module.exports = mongoose.model('users', UserSchema)
