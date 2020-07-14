const Area 	= require('../models/Area');
const _p    = require('../helpers/simpleasync');

//create area
module.exports.createArea = async areaInfo => {    
	return new Promise(async (resolve, reject) => {
		const [error, saveAreaInfo] = await _p(Area.create(areaInfo));

		if (!error) {
			return resolve(saveAreaInfo);
		} else {
			return reject(error.message);
		}
	});
};

//get all areas || can use query string
module.exports.getAreas = async query => {
	return new Promise(async (resolve, reject) => {
		const pageNum = query.page ? query.page : 1;
		const Limit = 10;
		const skip = Limit * (pageNum - 1);

		if(query.page) delete query.page;

		const [error, areas] = await _p(Area.find( query )
			.limit(Limit)
			.skip(skip)
			.sort({createdAt: 'desc'}));

		if(!error) {
			return resolve(areas);
		} else {
			return reject(error.message);
		}
	});
};

//get area by area id
module.exports.getAreaById = async id => {
	return new Promise(async (resolve, reject) => {
		const [error, area] = await _p(Area.findOne({ _id: id }));

		if(!error) {
			return resolve(area);
		} else {
			return reject(error.message);
		}
	});
};

//update area by area id
module.exports.updateAreaById = async (id, areaInfo) => {
	return new Promise(async (resolve, reject) => {
		const [error, updateAreaInfo] = await _p(Area.findOneAndUpdate({ _id: id }, areaInfo, { new: true	}));

		if (!error) {
			return resolve(updateAreaInfo);
		} else {
			return reject(error.message);
		}
	});
};
