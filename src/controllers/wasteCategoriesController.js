const categoryCrud   		= require('../services/wasteCategoriesCrud');
const colors       			= require('colors');
const _p       				= require('../helpers/simpleasync');
const { createResponse }    = require('../utils/responseGenerate');

//create category
module.exports.createCategory = async (req, res,next) => {
	const [error,category] = await _p(categoryCrud.createCategory(req.body));

	if (error) {
		console.log(error.red);
		return next(new Error('category creation failed' ));
	}
	return res.status(200).json(createResponse(category, 'category created successfully'));
};

//get all categories || can use query string
module.exports.getCategories = async (req, res,next) => {
	const [error,categories] = await _p(categoryCrud.getCategories(req.query));

	if(error) {
		console.log(error.red);
		return next(new Error('category fetch error'));
	}
	return res.status(200).json(createResponse(categories));
};

//get category by category id
module.exports.getCategoryById = async (req, res,next) => {
	const [error,category] = await _p(categoryCrud.getCategoryById(req.params.id));

	if(error) {
		console.log(error.red);
		return next(new Error('category fetch error'));
	}

	if(!category) {
		return res.status(200).json(createResponse(null, 'category not found'));
	}
	return res.status(200).json(createResponse(category));
};

//update category by category id
module.exports.updateCategoryById = async (req, res,next) => {
	let [error,category] = await _p(categoryCrud.updateCategoryById(req.params.id, req.body));

	if(error) {
		console.log(error.red);
		return next(new Error('category access error'));
	}
	if(!category) {
		return res.status(200).json(createResponse(null, 'category not found'));
	}
	return res.status(200).json(createResponse(category, 'category updated successfully'));
};
