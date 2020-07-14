const { check }    = require('express-validator');

module.exports.areaValidator = [
	check('userId')
		.exists({ checkNull: true, checkFalsy: true }).withMessage('UserId can\'t be empty').bail()
		.isString().withMessage('UserId must be a string'),
	check('type')
		.optional().exists({ checkNull: true, checkFalsy: true }).withMessage('Type can\'t be empty').bail().isString().withMessage('Type must be a string'),
    check('coords')
		.optional().exists({ checkNull: true, checkFalsy: true }).bail().isString().withMessage('Coords must be a string'),
];