const areaCrud   		    = require('../services/areaCrud');
const colors       			= require('colors');
const _p       				= require('../helpers/simpleasync');
const { createResponse }    = require('../utils/responseGenerate');

//create area
module.exports.createArea = async (req, res,next) => {
	const [error,area] = await _p(areaCrud.createArea(req.body));

	if (error) {
		console.log(error.red);
		return next(new Error('area creation failed' ));
	}
	return res.status(200).json(createResponse(area, 'area created successfully'));
};

//get all Areas || can use query string
module.exports.getAreas = async (req, res,next) => {
	const [error,categories] = await _p(areaCrud.getAreas(req.query));

	if(error) {
		console.log(error.red);
		return next(new Error('area fetch error'));
	}
	return res.status(200).json(createResponse(categories));
};

//get area by area id
module.exports.getAreaById = async (req, res,next) => {
	const [error,area] = await _p(areaCrud.getAreaById(req.params.id));

	if(error) {
		console.log(error.red);
		return next(new Error('area fetch error'));
	}

	if(!area) {
		return res.status(200).json(createResponse(null, 'area not found'));
	}
	return res.status(200).json(createResponse(area));
};

//update area by area id
module.exports.updateAreaById = async (req, res,next) => {
	let [error,area] = await _p(areaCrud.updateAreaById(req.params.id, req.body));

	if(error) {
		console.log(error.red);
		return next(new Error('area access error'));
	}
	if(!area) {
		return res.status(200).json(createResponse(null, 'area not found'));
	}
	return res.status(200).json(createResponse(area, 'area updated successfully'));
};
