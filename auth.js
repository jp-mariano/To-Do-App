// Base
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET_STRING;

// Creates an access token
module.exports.createAccessToken = (user) => {
	const data = {
		id: user._id,
		email: user.email
	};
	
	return jwt.sign(data, secret, {});
};

// Verifies authorization token coming from client
module.exports.verify = (req, res, next) => {
	let token = req.headers.authorization;
	
	if (typeof token !== 'undefined') {
		token = token.slice(7, token.length);
		
		return jwt.verify(token, secret, (err, data) => {
			return err ? res.send({ auth: 'failed '}) : next();
		});
	} else {
		return res.send({ auth: 'failed '});
	}
};

// Decodes the verified token
module.exports.decode = (token) => {
	if (typeof token !== 'undefined') {
		token = token.slice(7, token.length);
		
		return jwt.verify(token, secret, (err, data) => {
			return err ? null : jwt.decode(token, { complete: true }).payload;
		});
	} else {
		return null;
	}
};