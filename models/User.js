const mongoose = require('mongoose')

// Consts
const Schema = mongoose.Schema

const UserSchema = new Schema({
	fullname: { type: String },
	email: { type: String },
	password: { type: String },
})


// Export model
module.exports = mongoose.model('users', UserSchema)