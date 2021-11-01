const mongoose = require('mongoose')

// Consts
const Schema = mongoose.Schema

const url = new Schema({
	original_url: { type: String },
	shorten_url: { type: String },
    date: { type: Date},
	clicks: { type: Number }
})


// Export model
module.exports = mongoose.model('url', url)