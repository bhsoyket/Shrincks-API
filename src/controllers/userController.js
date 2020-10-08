const userCrud   			= require('../services/userCrud');
const colors       			= require('colors');
const _p       				= require('../helpers/simpleasync');
const { createResponse }    = require('../utils/responseGenerate');
const jwt           		= require('../helpers/jwt');

//create user: 
module.exports.createUser = async (req, res,next) => {
	const [error,user] = await _p(userCrud.createUser(req.body));

	if (error) {
		console.log(error.red);
		return next(new Error('user creation failed' ));
	}
	let token = '';
	if (user) {
		const payload = {
			id: user.userId,
			name: user.name,
			status: user.status,
			exp: Math.floor(Date.now() / 100) + (60 * 60)
		};
		token = await jwt.encode(payload);
	}
	
	return res.status(200).json(createResponse({token, ...user}, 'user created successfully'));
};

//get all categories || can use query string
module.exports.getUsers = async (req, res,next) => {
	const [error,categories] = await _p(userCrud.getUsers(req.query));

	if(error) {
		console.log(error.red);
		return next(new Error('user fetch error'));
	}
	return res.status(200).json(createResponse(categories));
};

//get user by user id
module.exports.getUserById = async (req, res,next) => {
	const [error,user] = await _p(userCrud.getUserById(req.params.id));

	if(error) {
		console.log(error.red);
		return next(new Error('user fetch error'));
	}

	if(!user) {
		return res.status(200).json(createResponse(null, 'user not found'));
	}
	return res.status(200).json(createResponse(user));
};

//update user by user id
module.exports.updateUserById = async (req, res,next) => {
	let [error,user] = await _p(userCrud.updateUserById(req.params.id, req.body));

	if(error) {
		console.log(error.red);
		return next(new Error('user access error'));
	}
	if(!user) {
		return res.status(200).json(createResponse(null, 'user not found'));
	}
	return res.status(200).json(createResponse(user, 'user updated successfully'));
};

//login user
module.exports.loginUser = async (req, res,next) => {
	const [error,user] = await _p(userCrud.loginUser(req.body.userId));

	if (error) {
		console.log(error.red);
		return next(new Error('user creation failed' ));
	}
	let token = '';
	if (user) {
		const payload = {
			id: user.userId,
			status: user.status,
			exp: Math.floor(Date.now() / 100) + (60 * 60)
		};
		token = await jwt.encode(payload);
	}
	
	return res.status(200).json(createResponse({token, ...user}, 'user login successfully'));
};
