const categoryCrud   		= require('../services/wasteCategoriesCrud');
const colors       			= require('colors');
const _p       				= require('../helpers/simpleasync');
const { createResponse }    = require('../utils/responseGenerate');
// const rc					= require('../helpers/redis');

//create category
module.exports.createCategory = async (req, res,next) => {
	const [error,category] = await _p(categoryCrud.createCategory(req.body));

	if (error) {
		console.log(error.red);
		return next(new Error('category creation failed' ));
	}
	return res.status(200).json(createResponse(category, 'category created successfully'));
};

// //get all categorys || can use query string
// module.exports.getcategorys = async (req, res,next) => {
// 	const [error,categorys] = await _p(categoryCrud.getcategorys(req.query));

// 	if(error) {
// 		console.log(error.red);
// 		return next(new Error('category fetch error'));
// 	}
// 	return res.status(200).json(createResponse(categorys));
// };

// //get category by category id
// module.exports.getcategoryById = async (req, res,next) => {
// 	const [error,category] = await _p(categoryCrud.getcategoryById(req.params.id));
// 	// category cache by id
// 	if(category) {
// 		const categoryId = category._id.toString();
// 		rc.set(categoryId, JSON.stringify(createResponse(category)));
// 	}

// 	if(error) {
// 		console.log(error.red);
// 		return next(new Error('category fetch error'));
// 	}

// 	if(!category) {
// 		return res.status(200).json(createResponse(null, 'category not found'));
// 	}
// 	return res.status(200).json(createResponse(category));
// };

// //update category by category id
// module.exports.updatecategoryById = async (req, res,next) => {
// 	let [error,category] = await _p(categoryCrud.updatecategoryById(req.params.id, req.body));
// 	// category cache by id
// 	if(category) {
// 		const categoryId = category._id.toString();
// 		rc.set(categoryId, JSON.stringify(createResponse(category)));
// 	}

// 	if(error) {
// 		console.log(error.red);
// 		return next(new Error('category access error'));
// 	}
// 	if(!category) {
// 		return res.status(200).json(createResponse(null, 'category not found'));
// 	}
// 	return res.status(200).json(createResponse(category, 'category updated successfully'));
// };

// //delete category by category id (soft delete)
// module.exports.deletecategoryById = async (req, res,next) => {
// 	let [error,category] = await _p(categoryCrud.deletecategoryById(req.params.id));
// 	// category cache delete
// 	if(category) {
// 		const categoryId = category._id.toString();
// 		rc.del(categoryId);
// 	}

// 	if(error) {
// 		console.log(error.red);
// 		return next(new Error('category access error'));
// 	}

// 	if(!category) {
// 		return res.status(200).json(createResponse(null, 'Active category can\'t be delete'));
// 	}
// 	return res.status(200).json(createResponse(null, 'category deleted successfully'));
// };

// //remove category by category id (permanent delete)
// module.exports.removecategoryById = async (req, res,next) => {
// 	let [error,category] = await _p(categoryCrud.removecategoryById(req.params.id));

// 	if(error) {
// 		console.log(error.red);
// 		return next(new Error('category access error'));
// 	}

// 	if(!category) {
// 		return res.status(200).json(createResponse(null, 'category can\'t be removed before soft delete'));
// 	}
// 	console.log(JSON.stringify(createResponse(category, 'category deleted permanently')), 'cyan');
// 	return res.status(200).json(createResponse(null, 'category deleted permanently'));
// };

// //restore category by category id
// module.exports.restorecategoryById = async (req, res,next) => {
// 	let [error,category] = await _p(categoryCrud.restorecategoryById(req.params.id));

// 	if(error) {
// 		console.log(error.red);
// 		return next(new Error('category access error'));
// 	}
// 	if(!category) {
// 		return res.status(200).json(createResponse(null, 'category can\'t be restore without soft delete'));
// 	}
// 	return res.status(200).json(createResponse(category, 'category restored successfully'));
// };

// //check category is valid
// module.exports.categoryValidityCheck = async (req, res, next) => {
// 	let [error,category] = await _p(categoryCrud.categoryValidityCheck(req.body));

// 	if(error) {
// 		console.log(error.red);
// 		return next(new Error('category access error'));
// 	}
// 	if(category === false) {
// 		return res.status(200).json(createResponse(null, 'category is not valid'));
// 	}
// 	if(category === null) {
// 		return res.status(200).json(createResponse(null, 'category not found'));
// 	}
// 	return res.status(200).json(createResponse(category, 'This category is valid'));
// };

// //get category user list
// module.exports.getcategoryUserList = async (req, res,next) => {
// 	let [error,categoryUsers] = await _p(categoryCrud.getcategoryUserList(req.query));

// 	if(error) {
// 		console.log(error.red);
// 		return next(new Error('category access error'));
// 	}
// 	if(!categoryUsers) {
// 		return res.status(200).json(createResponse(null, 'category user is not found'));
// 	}
// 	return res.status(200).json(createResponse(categoryUsers, 'category user list found successfully'));
// };

// //get user category list
// module.exports.getUsercategoryList = async (req, res,next) => {
// 	let [error,categoryUsers] = await _p(categoryCrud.getUsercategoryList(req.params.userId, req.query));

// 	if(error) {
// 		console.log(error.red);
// 		return next(new Error('category access error'));
// 	}
// 	if(!categoryUsers) {
// 		return res.status(200).json(createResponse(null, 'User category is not found'));
// 	}
// 	return res.status(200).json(createResponse(categoryUsers, 'User category list found successfully'));
// };
