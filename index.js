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
});

mongoose.connection.once('open', () => {
	console.log('Database connection successful!');
});

// Middleware
api.use(express.json());
api.use(express.urlencoded({ extended: true }));

// Route
// const userRoutes = require('');
// api.use('', userRoutes);

// Listening Port
api.listen(process.env.PORT, () => {
	console.log(`Listening on port ${ process.env.PORT }.`);
});