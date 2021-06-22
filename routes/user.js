// User Router
const express = require('express');
const router = express.Router();

// Authentication
const auth = require('../auth');

// Controller
const UserController = require('../controllers/user');

// ROUTES

// To check if user's email is already in the DB
router.post('/email-exists', async (req, res) => {
	try {
		res.send(await UserController.emailExists(req.body));
	} catch (err) {
		console.error(err);
	}
});

// To register new user
router.post('/register', async (req, res) => {
	try {
		res.send(await UserController.register(req.body));
	} catch (err) {
		console.error(err);
	}
});

// To log in via email
router.post('/log-in', async (req, res) => {
	try {
		res.send(await UserController.logIn(req.body));
	} catch (err) {
		console.error(err);
	}
});

// Get user's details
router.get('/details', async (req, res) => {
	try {
		const userId = auth.decode(req.headers.authorization).id;
		res.send(await UserController.getDetails(userId));
		
	} catch (err) {
		console.error(err);
	}
});

// Add a to do
router.post('/add-to-do', async (req, res) => {
	try {
		const userId = auth.decode(req.headers.authorization).id;
		res.send(await UserController.addToDo(req.body, userId));
		
	} catch (err) {
		console.error(err);
	}
});

// Edit user's names (givenName & familyName)
router.put('/edit/names', async (req, res) => {
	try {
		const userId = auth.decode(req.headers.authorization).id;
		res.send(await UserController.editNames(req.body, userId));
		
	} catch (err) {
		console.error(err);
	}
});

// Edit user's givenName
router.put('/edit/given-name', async (req, res) => {
	try {
		const userId = auth.decode(req.headers.authorization).id;
		res.send(await UserController.editGivenName(req.body, userId));
		
	} catch (err) {
		console.error(err);
	}
});

// Edit user's familyName
router.put('/edit/fam-name', async (req, res) => {
	try {
		const userId = auth.decode(req.headers.authorization).id;
		res.send(await UserController.editFamName(req.body, userId));
		
	} catch (err) {
		console.error(err);
	}
});

// Edit a to do's name, description, and toDoDate
router.put('/edit/to-do/:toDoId', async (req, res) => {
	try {
		const userId = auth.decode(req.headers.authorization).id;
		const toDoId = req.params.toDoId;
		res.send(await UserController.editToDo(req.body, userId, toDoId));
		
	} catch (err) {
		console.error(err);
	}
});

// Edit a to do's name


// Edit a to do's description


// Edit a to do's toDoDate


// Edit a to do's status


// Delete a to do
router.delete('/delete-to-do/:toDoId', async (req, res) => {
	try {
		const userId = auth.decode(req.headers.authorization).id;
		const toDoId = req.params.toDoId;
		res.send(await UserController.deleteToDo(userId, toDoId));
		
	} catch (err) {
		console.error(err);
	}
});

module.exports = router;