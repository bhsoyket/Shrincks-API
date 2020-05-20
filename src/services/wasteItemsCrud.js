const WasteItems 	= require('../models/WasteItems');
const _p 		    = require('../helpers/simpleasync');

//create item
module.exports.createItem = async itemInfo => {    
	return new Promise(async (resolve, reject) => {
		const [error, saveItemInfo] = await _p(WasteItems.create(itemInfo));

		if (!error) {
			return resolve(saveItemInfo);
		} else {
			return reject(error.message);
		}
	});
};

//get all items || can use query string
module.exports.getItems = async query => {
	return new Promise(async (resolve, reject) => {
		const pageNum = query.page ? query.page : 1;
		const Limit = 10;
		const skip = Limit * (pageNum - 1);

		if(query.page) delete query.page;

		const [error, items] = await _p(WasteItems.find( query )
			.populate({path: 'category', options: {sort: {name: 'asc'}}})
			.limit(Limit)
			.skip(skip)
			.sort({createdAt: 'desc'}));

		if(!error) {
			return resolve(items);
		} else {
			return reject(error.message);
		}
	});
};

//get item by item id
module.exports.getItemById = async id => {
	return new Promise(async (resolve, reject) => {
		const [error, item] = await _p(WasteItems.findOne({ _id: id })
		.populate({path: 'category', options: {sort: {name: 'asc'}}}));

		if(!error) {
			return resolve(item);
		} else {
			return reject(error.message);
		}
	});
};

//update item by item id
module.exports.updateItemById = async (id, itemInfo) => {
	return new Promise(async (resolve, reject) => {
		const [error, updateItemInfo] = await _p(WasteItems.findOneAndUpdate({ _id: id }, itemInfo, { new: true	}));

		if (!error) {
			return resolve(updateItemInfo);
		} else {
			return reject(error.message);
		}
	});
};
