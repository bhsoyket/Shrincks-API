const itemCrud 			 = require("../services/wasteItemsCrud");
const categoryCrud 		 = require("../services/wasteCategoriesCrud");
const colors 			 = require("colors");
const _p 				 = require("../helpers/simpleasync");
const { createResponse } = require("../utils/responseGenerate");
const tf				 = require('@tensorflow/tfjs');
const cocoSsd			 = require("@tensorflow-models/coco-ssd");
require('@tensorflow/tfjs-node');

//create item
module.exports.createItem = async (req, res, next) => {
	const [error, item] = await _p(itemCrud.createItem(req.body));

	if (error) {
		console.log(error.red);
		return next(new Error("item creation failed"));
	}
	if (item) {
		await _p(
			categoryCrud.updateCategoryById(item.categoryId, {
				$push: { items: item._id },
			})
		);
	}
	return res
		.status(200)
		.json(createResponse(item, "item created successfully"));
};

//get all items || can use query string
module.exports.getItems = async (req, res, next) => {
	const [error, Items] = await _p(itemCrud.getItems(req.query));

	if (error) {
		console.log(error.red);
		return next(new Error("item fetch error"));
	}
	return res.status(200).json(createResponse(Items));
};

//get item by item id
module.exports.getItemById = async (req, res, next) => {
	const [error, item] = await _p(itemCrud.getItemById(req.params.id));

	if (error) {
		console.log(error.red);
		return next(new Error("item fetch error"));
	}

	if (!item) {
		return res.status(200).json(createResponse(null, "item not found"));
	}
	return res.status(200).json(createResponse(item));
};

//update item by item id
module.exports.updateItemById = async (req, res, next) => {
	let [error, item] = await _p(
		itemCrud.updateItemById(req.params.id, req.body)
	);

	if (error) {
		console.log(error.red);
		return next(new Error("item access error"));
	}
	if (!item) {
		return res.status(200).json(createResponse(null, "item not found"));
	}
	return res
		.status(200)
		.json(createResponse(item, "item updated successfully"));
};

//update item by item id
module.exports.objectDetect = async (req, res) => {
	
	const img = req.file.originalname;
	console.log(img.red);

	// Load the model.
	const model = await cocoSsd.load();
	console.log("====================");
	

	// Classify the image.
	console.log("Predictions: ".blue);
	const predictions = await model.detect(img);

	console.log(predictions);

	// let [error,item] = await _p(itemCrud.updateItemById(req.params.id, req.body));

	// if(error) {
	// 	console.log(error.red);
	// 	return next(new Error('item access error'));
	// }
	// if(!item) {
	// 	return res.status(200).json(createResponse(null, 'item not found'));
	// }
	// return res.status(200).json(createResponse(item, 'item updated successfully'));
};
