// User Controller

// User Model
const User = require('../models/User');

// Authentication
const auth = require('../auth');

// bcryptjs
const bcryptjs = require('bcryptjs');

// To check if user's email is already in the DB
module.exports.emailExists = async (body) => {
	try {
		const user = await User.find({ email: body.email });
		return user.length > 0 ? true : false;
		
	} catch (err) {
		console.error(err);
	}
};

// To register new user
module.exports.register = async (body) => {
	try {
		const user = new User({
			givenName: body.givenName,
			familyName: body.familyName,
			email: body.email,
			password: bcryptjs.hashSync(body.password, 10)
		});
		
		await user.save(); //When this fails, it goes to catch
		return true; //If registration is a success, return true
		
	} catch (err) {
		console.error(err)
	}
};