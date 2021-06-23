// Base
const express = require('express');
const api = express();

// Mongoose
const mongoose = require('mongoose');

// CORS
const cors = require('cors');
api.use(cors());
api.options('*', cors());

// Environment Variables
require('dotenv').config();

// MongoDB Connection
const connectionString = process.env.DB_CONNECTION_STRING;
mongoose.connect(connectionString, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false
}).catch(err => console.error(err)); // This handles initial connection errors

mongoose.connection.once('open', () => {
	console.log('Database connection successful!');
});

// This handles errors after initial connection was established
mongoose.connection.on('error', err => {
	console.error(err);
});

// Middleware
api.use(express.json());
api.use(express.urlencoded({ extended: true }));

// Route
const userRoutes = require('./routes/user');
api.use('/api/users', userRoutes);

// Listening Port
api.listen(process.env.PORT, () => {
	console.log(`Listening on port ${ process.env.PORT }.`);
});