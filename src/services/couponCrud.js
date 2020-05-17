// const Coupon 	= require('../models/Coupon');
// const _p 		= require('../helpers/simpleasync');
// const moment    = require('moment');

// //create coupon
// module.exports.createCoupon = async couponInfo => {
// 	return new Promise(async (resolve, reject) => {
// 		couponInfo.code = couponInfo.code.toLowerCase();
// 		const [couponErr, saveCouponInfo] = await _p(Coupon.create(couponInfo));

// 		if (!couponErr) {
// 			return resolve(saveCouponInfo);
// 		} else {
// 			return reject(couponErr.message);
// 		}
// 	});
// };

// //get all coupons || can use query string
// module.exports.getCoupons = async query => {
// 	return new Promise(async (resolve, reject) => {
// 		const pageNum = query.page ? query.page : 1;
// 		const Limit = 10;
// 		const skip = Limit * (pageNum - 1);

// 		if(query.page) delete query.page;
// 		if(query.code) query.code = query.code.toLowerCase();  //find single coupon by coupon code

// 		const queries = {
// 			...query,
// 			deletedAt: { $eq: null }
// 		};

// 		if(query.deletedAt) queries.deletedAt = { $ne: null };  //get only deleted coupons

// 		const [couponErr, coupons] = await _p(Coupon.find( queries )
// 			.limit(Limit)
// 			.skip(skip)
// 			.sort({createdAt: 'desc'}));

// 		if(!couponErr) {
// 			return resolve(coupons);
// 		} else {
// 			return reject(couponErr.message);
// 		}
// 	});
// };

// //get coupon by coupon id
// module.exports.getCouponById = async id => {
// 	return new Promise(async (resolve, reject) => {
// 		const [couponErr, coupon] = await _p(Coupon.findOne({ _id: id, deletedAt: { $eq: null } }));

// 		if(!couponErr) {
// 			return resolve(coupon);
// 		} else {
// 			return reject(couponErr.message);
// 		}
// 	});
// };

// //update coupon by coupon id
// module.exports.updateCouponById = async (id, couponInfo) => {
// 	return new Promise(async (resolve, reject) => {
// 		if(couponInfo.code) couponInfo.code = couponInfo.code.toLowerCase();
// 		const [couponErr, updateCouponInfo] = await _p(Coupon.findOneAndUpdate({ _id: id, deletedAt: { $eq: null } }, couponInfo, { new: true	}));

// 		if (!couponErr) {
// 			return resolve(updateCouponInfo);
// 		} else {
// 			return reject(couponErr.message);
// 		}
// 	});
// };

// //delete coupon by coupon id (soft delete)
// module.exports.deleteCouponById = async (id) => {
// 	return new Promise(async (resolve, reject) => {
// 		const [couponErr, deleteCouponInfo] = await _p(Coupon.findOneAndUpdate({ _id: id, status: { $ne: 'active'} },
// 			{ deletedAt: moment().format() },
// 			{ new: true }
// 			));

// 		if (!couponErr) {
// 			return resolve(deleteCouponInfo);
// 		} else {
// 			return reject(couponErr.message);
// 		}
// 	});
// };

// //remove coupon by coupon id (permanent delete)
// module.exports.removeCouponById = async (id) => {
// 	return new Promise(async (resolve, reject) => {
// 		const [couponErr, removeCouponInfo] = await _p(Coupon.findOneAndDelete({ _id: id, deletedAt: { $ne: null } }));

// 		if (!couponErr) {
// 			return resolve(removeCouponInfo);
// 		} else {
// 			return reject(couponErr.message);
// 		}
// 	});
// };

// //restore coupon by coupon id
// module.exports.restoreCouponById = async (id) => {
// 	return new Promise(async (resolve, reject) => {
// 		const [couponErr, restoreCouponInfo] = await _p(Coupon.findOneAndUpdate({ _id: id, deletedAt: { $ne: null } },
// 			{ status: 'active', $unset: {deletedAt: 1} },
// 			{ new: true }
// 			));

// 		if (!couponErr) {
// 			return resolve(restoreCouponInfo);
// 		} else {
// 			return reject(couponErr.message);
// 		}
// 	});
// };

// //get coupon user list || can use query string (code)
// const getCouponUserList = module.exports.getCouponUserList = async (query) => {
// 	return new Promise(async (resolve, reject) => {
// 		let couponCode = {};
// 		if(query.code) {
// 			couponCode = {code: query.code.toLowerCase()}
// 		}

// 		const [couponErr, couponUsers] = await _p(Coupon.aggregate([
// 			{ $match: {$and: [{ deletedAt: { $eq: null }}, couponCode] }},
// 			{ $sort: { updatedAt: -1 } },
// 			{ $project: { code: '$code', users: '$users', totalUser: { $size: "$users" } } },
// 			{ $limit: 10 }
// 		]));

// 		if (!couponErr) {
// 			return resolve(couponUsers);
// 		} else {
// 			return reject(couponErr.message);
// 		}
// 	});
// };

// //get user coupon list || can use query string (user id)
// const getUserCouponList = module.exports.getUserCouponList = async (id, query) => {
// 	return new Promise(async (resolve, reject) => {
// 		const [couponErr, couponUsers] = await _p(Coupon.aggregate([
// 			{ $match: {$and: [{ deletedAt: { $eq: null }}, query, { "users.id": {$eq: id} }] }},
// 			{ $sort: { updatedAt: -1 } },
// 			{ $project: {
// 				use: { $size: {$filter: {
// 						input: '$users',
// 						as: 'users',
// 						cond: { $eq: ['$$users.id', id]}
// 					}}},
// 				code: 1,
// 				_id: 0
// 			}},
// 		]));

// 		if (!couponErr) {
// 			return resolve(couponUsers);
// 		} else {
// 			return reject(couponErr.message);
// 		}
// 	});
// };

// //check coupon is valid
// module.exports.couponValidityCheck = async function (info) {
// 	return new Promise(async (resolve, reject) => {
// 		let [couponErr, coupon] = await _p(Coupon.findOne({ code: info.code.toLowerCase() }));
// 		let validity = false;

// 		if (!coupon) {
// 			return resolve(null);
// 		}
// 		if (info.product) {
// 			validity = (moment().isBetween(coupon.validity.from, coupon.validity.to)) && (info.product === coupon.product);
// 		}else {
// 			validity = (moment().isBetween(coupon.validity.from, coupon.validity.to));
// 		}

// 		// check user usage limit
// 		if (validity && info.user) {
// 			const [cuerr,usagesLimitOfPerUser] = await _p(getUserCouponList(info.user, {code: coupon.code}));
// 			if (!cuerr && usagesLimitOfPerUser[0].use >= coupon.usagesLimitPerUser){
// 				return resolve("user limit is over");
// 			}
// 		}
// 		// check coupon usage limit
// 		if (validity && info.user) {
// 			const [cuerr,usagesLimitOfCoupon] = await _p(getCouponUserList({code: coupon.code}));
// 			if (!cuerr && usagesLimitOfCoupon[0].totalUser >= coupon.usagesLimitCoupon){
// 				return resolve("coupon limit is over");
// 			}
// 		}
// 		// check coupon users limit
// 		if (validity && info.user) {
// 			const uniqueUser = [...new Set(coupon.users.map(user => user.id))];
// 			if (uniqueUser.length >= coupon.usagesLimitUser){
// 				return resolve("coupon users limit is over");
// 			}
// 		}

// 		if (validity) {
// 			return resolve(coupon);
// 		}
// 		if (!validity) {
// 			return resolve(false);
// 		}else {
// 			return reject(couponErr);
// 		}
// 	});
// };

// //find coupon by
// function findByCoupon(code) {
// 	return new Promise(async (resolve, reject) => {
// 		let [couponErr, coupon] = await _p(Coupon.findOne({ code: code.toLowerCase() }));

// 		if (!coupon) {
// 			return resolve(null);
// 		} else {
// 			return resolve(coupon);
// 		}
// 	});
// }
// module.exports.findBycoupon = findByCoupon;

// //check coupon already exist
// module.exports.isCouponExist = async function (code) {
// 	let coupon = await findByCoupon(code);
// 	if (coupon) return Promise.reject('already in exist');
// };
