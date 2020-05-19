const WasteCategories 	= require('../models/WasteCategories');
const _p 		        = require('../helpers/simpleasync');

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

//get all categories || can use query string
module.exports.getCategories = async query => {
	return new Promise(async (resolve, reject) => {
		const pageNum = query.page ? query.page : 1;
		const Limit = 10;
		const skip = Limit * (pageNum - 1);

		if(query.page) delete query.page;

		const [error, categories] = await _p(WasteCategories.find( query )
			.limit(Limit)
			.skip(skip)
			.sort({createdAt: 'desc'}));

		if(!error) {
			return resolve(categories);
		} else {
			return reject(error.message);
		}
	});
};

//get category by category id
module.exports.getCategoryById = async id => {
	return new Promise(async (resolve, reject) => {
		const [error, category] = await _p(WasteCategories.findOne({ _id: id }));

		if(!error) {
			return resolve(category);
		} else {
			return reject(error.message);
		}
	});
};

//update category by category id
module.exports.updateCategoryById = async (id, categoryInfo) => {
	return new Promise(async (resolve, reject) => {
		const [error, updateCategoryInfo] = await _p(WasteCategories.findOneAndUpdate({ _id: id }, categoryInfo, { new: true	}));

		if (!error) {
			return resolve(updateCategoryInfo);
		} else {
			return reject(error.message);
		}
	});
};
