// User Controller

// User Model
const User = require('../models/User');

// Authentication
const { OAuth2Client } = require('google-auth-library');
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
		
		// If user returns null, it means that the email doesn't exist in DB
		if (user === null) {
			return { error: 'email-does-not-exist' };
		}
		
		// If the user's loginType is not 'email', return a login type error
		if (user.loginType !== 'email') {
			return { error: 'login-type-error' };
		}
		
		// Compares the password from the client's input to the password from the DB
		const isPasswordMatched = bcryptjs.compareSync(body.password, user.password);
		
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

// To log in via Google
module.exports.verifyGoogleTokenId = async (tokenId) => {
	const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
	
	const data = await client.verifyIdToken({
		idToken: tokenId,
		audience: process.env.GOOGLE_CLIENT_ID
	});
	
	// If user's email is verified by Google, search if it's already in our DB
	if (data.payload.email_verified) {
		const user = await User.findOne({ email: data.payload.email });
		
		// Checks if user is registered via Google login
		if (user !== null) {
			// If they are, return an access token.
			if (user.loginType === 'google') {
				return { accessToken: auth.createAccessToken(user.toObject()) };
				
				// Else, return a login type error. They may have registered via their email only.
			} else {
				return { error: 'login-type-error' };
			}
			
			// If email is verified by Google but the user isn't registere with us, proceed with the registration process
		} else {
			let user = new User({
				givenName: data.payload.given_name,
				familyName: data.payload.family_name,
				email: data.payload.email,
				loginType: 'google'
			});
			
			// After registering them in our DB, return an access token
			await user.save();
			return { accessToken: auth.createAccessToken(user.toObject()) };
		}
		
		// If user's email isn't verified by Google
	} else {
		return { error: 'google-auth-error' };
	}
};

// Get user's details
module.exports.getDetails = async (userId) => {
	try {
		const user = await User.findById(userId);
		user.password = undefined; // To leave out the password
		return user;
		
	} catch (err) {
		console.error(err);
	}
};

// Edit user's names (givenName & familyName)
module.exports.editNames = async (body, userId) => {
	try {
		const updates = {
			givenName: body.givenName,
			familyName: body.familyName
		};
		
		await User.findByIdAndUpdate(userId, updates);
		return true; // If success, return true
		
	} catch (err) {
		console.error(err);
	}
};

// Edit user's givenName
module.exports.editGivenName = async (body, userId) => {
	try {
		const update = { givenName: body.givenName };
		
		await User.findByIdAndUpdate(userId, update);
		return true; // If success, return true
		
	} catch (err) {
		console.error(err);
	}
};

// Edit user's familyName
module.exports.editFamName = async (body, userId) => {
	try {
		const update = { familyName: body.familyName };
		
		await User.findByIdAndUpdate(userId, update);
		return true; // If success, return true
		
	} catch (err) {
		console.error(err);
	}
};

// Add a to do
module.exports.addToDo = async (body, userId) => {
	try {
		const newToDo = {
			$push: {
				toDo: {
					name: body.name,
					description: body.description,
					toDoDate: body.toDoDate
				}
			}
		};
		
		await User.findByIdAndUpdate(userId, newToDo);
		return true; // If success, return true
		
	} catch (err) {
		console.error(err);
	}
};

// Edit a to do's name, description, and toDoDate
module.exports.editToDo = async (body, userId, toDoId) => {
	try {
		const updates = {
			$set: {
				'toDo.$[elem].name': body.name,
				'toDo.$[elem].description': body.description,
				'toDo.$[elem].toDoDate': body.toDoDate
			}
		};
		
		const filter = {
			arrayFilters: [ { 'elem._id': toDoId } ]
		};
		
		await User.findByIdAndUpdate(userId, updates, filter);
		return true; // If success, return true
		
	} catch (err) {
		console.error(err);
	}
};

// Edit a to do's name
module.exports.editToDoName = async (body, userId, toDoId) => {
	try {
		const update = {
			$set: { 'toDo.$[elem].name': body.name }
		};
		
		const filter = {
			arrayFilters: [ { 'elem._id': toDoId } ]
		};
		
		await User.findByIdAndUpdate(userId, update, filter);
		return true; // If success, return true
		
	} catch (err) {
		console.error(err);
	}
};

// Edit a to do's description
module.exports.editToDoDesc = async (body, userId, toDoId) => {
	try {
		const update = {
			$set: { 'toDo.$[elem].description': body.description }
		};
		
		const filter = {
			arrayFilters: [ { 'elem._id': toDoId } ]
		};
		
		await User.findByIdAndUpdate(userId, update, filter);
		return true; // If success, return true
		
	} catch (err) {
		console.error(err);
	}
};

// Edit a to do's toDoDate
module.exports.editToDoDate = async (body, userId, toDoId) => {
	try {
		const update = {
			$set: { 'toDo.$[elem].toDoDate': body.toDoDate }
		};
		
		const filter = {
			arrayFilters: [ { 'elem._id': toDoId } ]
		};
		
		await User.findByIdAndUpdate(userId, update, filter);
		return true; // If success, return true
		
	} catch (err) {
		console.error(err);
	}
};

// Edit a to do's status
module.exports.editToDoStatus = async (body, userId, toDoId) => {
	try {
		const update = {
			$set: { 'toDo.$[elem].status': body.status }
		};
		
		const filter = {
			arrayFilters: [ { 'elem._id': toDoId } ]
		};
		
		await User.findByIdAndUpdate(userId, update, filter);
		return true; // If success, return true
		
	} catch (err) {
		console.error(err);
	}
};

// Delete a to do
module.exports.deleteToDo = async (userId, toDoId) => {
	try {
		const toBeDeleted = {
			$pull: {
				toDo: { _id: toDoId }
			}
		};
		
		await User.findByIdAndUpdate(userId, toBeDeleted);
		return true; // If success, return true
		
	} catch (err) {
		console.error(err);
	}
};