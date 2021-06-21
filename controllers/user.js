// User Controller

// User Model
const User = require('../models/User');

// Authentication
const auth = require('../auth');

// bcryptjs
const bcryptjs = require('bcryptjs');

// CONTROLLERS

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
		
		await user.save(); // When this fails, it goes to catch
		return true; // If registration is a success, return true
		
	} catch (err) {
		console.error(err)
	}
};

// To log in via email
module.exports.logIn = async (body) => {
	try {
		const user = await User.findOne({ email: body.email });
		
		// Compares the password from the client's input to the password from the DB
		const isPasswordMatched = bcryptjs.compareSync(body.password, user.password);
		
		// If user returns null, it means that the email doesn't exist in DB
		if (user === null) {
			return { error: 'email-does-not-exist' };
		}
		
		// If the user's loginType is not 'email', return a login type error
		if (user.loginType !== 'email') {
			return { error: 'login-type-error' };
		}
		
		// This will create a token that will contain the user's details if the password matches
		if (isPasswordMatched) {
			return { accessToken: auth.createAccessToken(user.toObject()) };
		} else {
			return { error: 'incorrect-password' }; // Return this if passwords doesn't match
		}
		
	} catch (err) {
		console.error(err);
	}
};

// Add a to do
module.exports.addToDo = async (body, userId) => {
	try {
		const user = await User.findById(userId);
		
		user.toDo.push({
			name: body.name,
			description: body.description,
			toDoDate: body.toDoDate,
		});
		
		await user.save(); // When this fails, it goes to catch
		return true // If success, return true
		
	} catch (err) {
		console.error(err);
	}
};