// User Schema
const mongoose = require('mongoose');

const User = new mongoose.Schema({
	givenName: {
		type: String,
		required: [true, 'Given name is required.']
	},
	familyName: {
		type: String,
		required: [true, 'Family name is required.']
	},
	email: {
		type: String,
		required: [true, 'Email is required.']
	},
	password: {
		type: String
	},
	loginType: {
		type: String,
		default: 'email' //Alternative value is 'google'
	},
	toDo: [
		{
			name: {
				type: String,
				required: [true, 'To-do name is required.']
			},
			description: {
				type: String //description is optional
			},
			toDoDate: {
				type: Date
			},
			status: {
				type: String,
				default: 'pending' //Alternative value is 'done'
			},
			createdOn: {
				type: Date,
				default: new Date()
			}
		}
	]
}, { timestamps: true });

module.exports = mongoose.model('user', User);