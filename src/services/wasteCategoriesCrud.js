const WasteCategories 	= require('../models/WasteCategories');
const _p 		        = require('../helpers/simpleasync');
const moment            = require('moment');

//create category
module.exports.createCategory = async categoryInfo => {    
	return new Promise(async (resolve, reject) => {
		const [error, saveCategoryInfo] = await _p(WasteCategories.create(categoryInfo));

		if (!error) {
			return resolve(saveCategoryInfo);
		} else {
			return reject(error.message);
		}
	});
};

// //get all coupons || can use query string
// module.exports.getCategorys = async query => {
// 	return new Promise(async (resolve, reject) => {
// 		const pageNum = query.page ? query.page : 1;
// 		const Limit = 10;
// 		const skip = Limit * (pageNum - 1);

// 		if(query.page) delete query.page;
// 		if(query.code) query.code = query.code.toLowerCase();  //find single category by category code

// 		const queries = {
// 			...query,
// 			deletedAt: { $eq: null }
// 		};

// 		if(query.deletedAt) queries.deletedAt = { $ne: null };  //get only deleted coupons

// 		const [error, coupons] = await _p(Category.find( queries )
// 			.limit(Limit)
// 			.skip(skip)
// 			.sort({createdAt: 'desc'}));

// 		if(!error) {
// 			return resolve(coupons);
// 		} else {
// 			return reject(error.message);
// 		}
// 	});
// };

// //get category by category id
// module.exports.getCategoryById = async id => {
// 	return new Promise(async (resolve, reject) => {
// 		const [error, category] = await _p(Category.findOne({ _id: id, deletedAt: { $eq: null } }));

// 		if(!error) {
// 			return resolve(category);
// 		} else {
// 			return reject(error.message);
// 		}
// 	});
// };

// //update category by category id
// module.exports.updateCategoryById = async (id, categoryInfo) => {
// 	return new Promise(async (resolve, reject) => {
// 		if(categoryInfo.code) categoryInfo.code = categoryInfo.code.toLowerCase();
// 		const [error, updateCategoryInfo] = await _p(Category.findOneAndUpdate({ _id: id, deletedAt: { $eq: null } }, categoryInfo, { new: true	}));

// 		if (!error) {
// 			return resolve(updateCategoryInfo);
// 		} else {
// 			return reject(error.message);
// 		}
// 	});
// };

// //delete category by category id (soft delete)
// module.exports.deleteCategoryById = async (id) => {
// 	return new Promise(async (resolve, reject) => {
// 		const [error, deleteCategoryInfo] = await _p(Category.findOneAndUpdate({ _id: id, status: { $ne: 'active'} },
// 			{ deletedAt: moment().format() },
// 			{ new: true }
// 			));

// 		if (!error) {
// 			return resolve(deleteCategoryInfo);
// 		} else {
// 			return reject(error.message);
// 		}
// 	});
// };

// //remove category by category id (permanent delete)
// module.exports.removeCategoryById = async (id) => {
// 	return new Promise(async (resolve, reject) => {
// 		const [error, removeCategoryInfo] = await _p(Category.findOneAndDelete({ _id: id, deletedAt: { $ne: null } }));

// 		if (!error) {
// 			return resolve(removeCategoryInfo);
// 		} else {
// 			return reject(error.message);
// 		}
// 	});
// };

// //restore category by category id
// module.exports.restoreCategoryById = async (id) => {
// 	return new Promise(async (resolve, reject) => {
// 		const [error, restoreCategoryInfo] = await _p(Category.findOneAndUpdate({ _id: id, deletedAt: { $ne: null } },
// 			{ status: 'active', $unset: {deletedAt: 1} },
// 			{ new: true }
// 			));

// 		if (!error) {
// 			return resolve(restoreCategoryInfo);
// 		} else {
// 			return reject(error.message);
// 		}
// 	});
// };

// //get category user list || can use query string (code)
// const getCategoryUserList = module.exports.getCategoryUserList = async (query) => {
// 	return new Promise(async (resolve, reject) => {
// 		let couponCode = {};
// 		if(query.code) {
// 			couponCode = {code: query.code.toLowerCase()}
// 		}

// 		const [error, couponUsers] = await _p(Category.aggregate([
// 			{ $match: {$and: [{ deletedAt: { $eq: null }}, couponCode] }},
// 			{ $sort: { updatedAt: -1 } },
// 			{ $project: { code: '$code', users: '$users', totalUser: { $size: "$users" } } },
// 			{ $limit: 10 }
// 		]));

// 		if (!error) {
// 			return resolve(couponUsers);
// 		} else {
// 			return reject(error.message);
// 		}
// 	});
// };

// //get user category list || can use query string (user id)
// const getUserCategoryList = module.exports.getUserCategoryList = async (id, query) => {
// 	return new Promise(async (resolve, reject) => {
// 		const [error, couponUsers] = await _p(Category.aggregate([
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

// 		if (!error) {
// 			return resolve(couponUsers);
// 		} else {
// 			return reject(error.message);
// 		}
// 	});
// };

// //check category is valid
// module.exports.couponValidityCheck = async function (info) {
// 	return new Promise(async (resolve, reject) => {
// 		let [error, category] = await _p(Category.findOne({ code: info.code.toLowerCase() }));
// 		let validity = false;

// 		if (!category) {
// 			return resolve(null);
// 		}
// 		if (info.product) {
// 			validity = (moment().isBetween(category.validity.from, category.validity.to)) && (info.product === category.product);
// 		}else {
// 			validity = (moment().isBetween(category.validity.from, category.validity.to));
// 		}

// 		// check user usage limit
// 		if (validity && info.user) {
// 			const [cuerr,usagesLimitOfPerUser] = await _p(getUserCategoryList(info.user, {code: category.code}));
// 			if (!cuerr && usagesLimitOfPerUser[0].use >= category.usagesLimitPerUser){
// 				return resolve("user limit is over");
// 			}
// 		}
// 		// check category usage limit
// 		if (validity && info.user) {
// 			const [cuerr,usagesLimitOfCategory] = await _p(getCategoryUserList({code: category.code}));
// 			if (!cuerr && usagesLimitOfCategory[0].totalUser >= category.usagesLimitCategory){
// 				return resolve("category limit is over");
// 			}
// 		}
// 		// check category users limit
// 		if (validity && info.user) {
// 			const uniqueUser = [...new Set(category.users.map(user => user.id))];
// 			if (uniqueUser.length >= category.usagesLimitUser){
// 				return resolve("category users limit is over");
// 			}
// 		}

// 		if (validity) {
// 			return resolve(category);
// 		}
// 		if (!validity) {
// 			return resolve(false);
// 		}else {
// 			return reject(error);
// 		}
// 	});
// };

// //find category by
// function findByCategory(code) {
// 	return new Promise(async (resolve, reject) => {
// 		let [error, category] = await _p(Category.findOne({ code: code.toLowerCase() }));

// 		if (!category) {
// 			return resolve(null);
// 		} else {
// 			return resolve(category);
// 		}
// 	});
// }
// module.exports.findBycoupon = findByCategory;

// //check category already exist
// module.exports.isCategoryExist = async function (code) {
// 	let category = await findByCategory(code);
// 	if (category) return Promise.reject('already in exist');
// };
