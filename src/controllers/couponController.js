// const couponCrud   			= require('../services/couponCrud');
// const _log       			= require('../utils/logger');
// const _p       				= require('../helpers/simpleasync');
// const { createResponse }    = require('../utils/responseGenerate');
// // const rc					= require('../helpers/redis');

// //create coupon
// module.exports.createCoupon = async (req, res,next) => {
// 	const [cuerr,coupon] = await _p(couponCrud.createCoupon(req.body));

// 	if (cuerr) {
// 		_log(cuerr, 'red');
// 		return next(new Error('coupon creation failed' ));
// 	}
// 	return res.status(200).json(createResponse(coupon, 'Coupon created successfully'));
// };

// //get all coupons || can use query string
// module.exports.getCoupons = async (req, res,next) => {
// 	const [cuerr,coupons] = await _p(couponCrud.getCoupons(req.query));

// 	if(cuerr) {
// 		_log(cuerr, 'red');
// 		return next(new Error('Coupon fetch error'));
// 	}
// 	return res.status(200).json(createResponse(coupons));
// };

// //get coupon by coupon id
// module.exports.getCouponById = async (req, res,next) => {
// 	const [cuerr,coupon] = await _p(couponCrud.getCouponById(req.params.id));
// 	// coupon cache by id
// 	if(coupon) {
// 		const couponId = coupon._id.toString();
// 		rc.set(couponId, JSON.stringify(createResponse(coupon)));
// 	}

// 	if(cuerr) {
// 		_log(cuerr, 'red');
// 		return next(new Error('Coupon fetch error'));
// 	}

// 	if(!coupon) {
// 		return res.status(200).json(createResponse(null, 'Coupon not found'));
// 	}
// 	return res.status(200).json(createResponse(coupon));
// };

// //update coupon by coupon id
// module.exports.updateCouponById = async (req, res,next) => {
// 	let [cuerr,coupon] = await _p(couponCrud.updateCouponById(req.params.id, req.body));
// 	// coupon cache by id
// 	if(coupon) {
// 		const couponId = coupon._id.toString();
// 		rc.set(couponId, JSON.stringify(createResponse(coupon)));
// 	}

// 	if(cuerr) {
// 		_log(cuerr, 'red');
// 		return next(new Error('Coupon access error'));
// 	}
// 	if(!coupon) {
// 		return res.status(200).json(createResponse(null, 'Coupon not found'));
// 	}
// 	return res.status(200).json(createResponse(coupon, 'Coupon updated successfully'));
// };

// //delete coupon by coupon id (soft delete)
// module.exports.deleteCouponById = async (req, res,next) => {
// 	let [cuerr,coupon] = await _p(couponCrud.deleteCouponById(req.params.id));
// 	// coupon cache delete
// 	if(coupon) {
// 		const couponId = coupon._id.toString();
// 		rc.del(couponId);
// 	}

// 	if(cuerr) {
// 		_log(cuerr, 'red');
// 		return next(new Error('Coupon access error'));
// 	}

// 	if(!coupon) {
// 		return res.status(200).json(createResponse(null, 'Active coupon can\'t be delete'));
// 	}
// 	return res.status(200).json(createResponse(null, 'Coupon deleted successfully'));
// };

// //remove coupon by coupon id (permanent delete)
// module.exports.removeCouponById = async (req, res,next) => {
// 	let [cuerr,coupon] = await _p(couponCrud.removeCouponById(req.params.id));

// 	if(cuerr) {
// 		_log(cuerr, 'red');
// 		return next(new Error('Coupon access error'));
// 	}

// 	if(!coupon) {
// 		return res.status(200).json(createResponse(null, 'Coupon can\'t be removed before soft delete'));
// 	}
// 	_log(JSON.stringify(createResponse(coupon, 'Coupon deleted permanently')), 'cyan');
// 	return res.status(200).json(createResponse(null, 'Coupon deleted permanently'));
// };

// //restore coupon by coupon id
// module.exports.restoreCouponById = async (req, res,next) => {
// 	let [cuerr,coupon] = await _p(couponCrud.restoreCouponById(req.params.id));

// 	if(cuerr) {
// 		_log(cuerr, 'red');
// 		return next(new Error('Coupon access error'));
// 	}
// 	if(!coupon) {
// 		return res.status(200).json(createResponse(null, 'Coupon can\'t be restore without soft delete'));
// 	}
// 	return res.status(200).json(createResponse(coupon, 'Coupon restored successfully'));
// };

// //check coupon is valid
// module.exports.couponValidityCheck = async (req, res, next) => {
// 	let [cuerr,coupon] = await _p(couponCrud.couponValidityCheck(req.body));

// 	if(cuerr) {
// 		_log(cuerr, 'red');
// 		return next(new Error('Coupon access error'));
// 	}
// 	if(coupon === false) {
// 		return res.status(200).json(createResponse(null, 'Coupon is not valid'));
// 	}
// 	if(coupon === null) {
// 		return res.status(200).json(createResponse(null, 'Coupon not found'));
// 	}
// 	return res.status(200).json(createResponse(coupon, 'This coupon is valid'));
// };

// //get coupon user list
// module.exports.getCouponUserList = async (req, res,next) => {
// 	let [cuerr,couponUsers] = await _p(couponCrud.getCouponUserList(req.query));

// 	if(cuerr) {
// 		_log(cuerr, 'red');
// 		return next(new Error('Coupon access error'));
// 	}
// 	if(!couponUsers) {
// 		return res.status(200).json(createResponse(null, 'Coupon user is not found'));
// 	}
// 	return res.status(200).json(createResponse(couponUsers, 'Coupon user list found successfully'));
// };

// //get user coupon list
// module.exports.getUserCouponList = async (req, res,next) => {
// 	let [cuerr,couponUsers] = await _p(couponCrud.getUserCouponList(req.params.userId, req.query));

// 	if(cuerr) {
// 		_log(cuerr, 'red');
// 		return next(new Error('Coupon access error'));
// 	}
// 	if(!couponUsers) {
// 		return res.status(200).json(createResponse(null, 'User coupon is not found'));
// 	}
// 	return res.status(200).json(createResponse(couponUsers, 'User coupon list found successfully'));
// };
