const { check }    = require('express-validator');

module.exports.itemValidator = [
	check('itemId')
		.exists({ checkNull: true, checkFalsy: true }).withMessage('ItemId can\'t be empty').bail()
		.isString().withMessage('ItemId must be a string'),
	check('name')
		.exists({ checkNull: true, checkFalsy: true }).withMessage('Name can\'t be empty').bail()
		.isString().withMessage('Name must be a string'),
	check('icon')
		.optional().exists({ checkNull: true, checkFalsy: true }).bail().isString().withMessage('Icon must be a string'),
	check('description')
		.optional().exists({ checkNull: true, checkFalsy: true }).bail().isString().withMessage('Description must be a string'),
	check('reduceWay')
		.optional().exists({ checkNull: true, checkFalsy: true }).bail().isString().withMessage('ReduceWay must be a string'),
	check('category')
		.optional().exists({ checkNull: true, checkFalsy: true }).bail().isString().withMessage('CategoryId must be a string'),
];

