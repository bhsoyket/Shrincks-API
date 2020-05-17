const couponCrud   = require('../services/couponCrud');
const { check }    = require('express-validator');

module.exports.couponValidator = [
	check('name')
		.exists({ checkNull: true, checkFalsy: true }).withMessage('Name can\'t be empty').bail()
		.isString().withMessage('Name must be a string'),
	check('discountType')
		.exists({ checkNull: true, checkFalsy: true }).withMessage('Discount type can\'t be empty').bail()
		.isString().withMessage('Name must be a string'),
	check('amount')
		.exists({ checkNull: true, checkFalsy: true }).withMessage('Amount can\'t be empty').bail()
		.isDecimal().withMessage('Amount must be a decimal'),
	check('maxAmount')
		.optional().exists({ checkNull: true, checkFalsy: true }).withMessage('Max Amount can\'t be empty').bail()
		.isDecimal().withMessage('Max amount must be a decimal'),
	check('usagesLimitCoupon')
		.exists({ checkNull: true, checkFalsy: true }).withMessage('Usages limit coupon can\'t be empty').bail()
		.isDecimal().withMessage('Usages limit coupon must be a string'),
	check('usagesLimitUser')
		.exists({ checkNull: true, checkFalsy: true }).withMessage('Usages limit user can\'t be empty').bail()
		.isDecimal().withMessage('Usages limit user must be a number'),
	check('usagesLimitPerUser')
		.exists({ checkNull: true, checkFalsy: true }).withMessage('Usages limit per user can\'t be empty').bail()
		.isDecimal().withMessage('Usages limit per user must be a number'),
	check('validity.from')
		.exists({ checkNull: true, checkFalsy: true }).withMessage('Validity from can\'t be empty').bail()
		.toDate().withMessage('Validity from must be a date'),
	check('validity.to')
		.exists({ checkNull: true, checkFalsy: true }).withMessage('Validity to can\'t be empty').bail()
		.toDate().withMessage('Validity to must be a date'),
	check('status')
		.exists({ checkNull: true, checkFalsy: true }).withMessage('Status can\'t be empty').bail()
		.isString().withMessage('Status must be a string'),
	check('service')
		.optional().isString().withMessage('Service type must be a string'),
	check('subService')
		.optional().isString().withMessage('Subservice type must be a string'),
	check('product')
		.optional().isString().withMessage('Product type must be a string'),
	check('description')
		.optional().isString().withMessage('Description must be a string'),
	check('users.id')
		.optional().exists({ checkNull: true, checkFalsy: true }).bail().toDate(),
	check('users.time')
		.optional().exists({ checkNull: true, checkFalsy: true }).bail().toDate(),
	check('code')
		.exists({ checkNull: true, checkFalsy: true }).withMessage('Code can\'t be empty').bail()
		.isString().withMessage('Code must be a string').bail()
		.custom(couponCrud.isCouponExist).withMessage('Code must be a unique'),
];

