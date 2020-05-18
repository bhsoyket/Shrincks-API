const { check }    = require('express-validator');

module.exports.categoryValidator = [
	check('categoryId')
		.exists({ checkNull: true, checkFalsy: true }).withMessage('CategoryId can\'t be empty').bail()
		.isString().withMessage('CategoryId must be a string'),
	check('name')
		.exists({ checkNull: true, checkFalsy: true }).withMessage('Name can\'t be empty').bail()
		.isString().withMessage('Name must be a string'),
	check('icon')
		.optional().exists({ checkNull: true, checkFalsy: true }).bail().isString().withMessage('Icon must be a string'),
	check('description')
		.optional().exists({ checkNull: true, checkFalsy: true }).bail().isString().withMessage('Description must be a string'),
	check('items')
		.optional().exists({ checkNull: true, checkFalsy: true }).bail().isString().withMessage('Item must be a string'),
];

