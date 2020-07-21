const itemCrud 			 = require("../services/wasteItemsCrud");
const categoryCrud 		 = require("../services/wasteCategoriesCrud");
const colors 			 = require("colors");
const _p 				 = require("../helpers/simpleasync");
const { createResponse } = require("../utils/responseGenerate");
const tf				 = require('@tensorflow/tfjs');
require('@tensorflow/tfjs-node');
require('@tensorflow/tfjs-backend-cpu');
require('@tensorflow/tfjs-backend-webgl');
const cocoSsd			 = require("@tensorflow-models/coco-ssd");

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

//detect objects form image
module.exports.objectDetect = async (req, res, next) => {
	
	const img = req.file.originalname;
	console.log(img.red);

	let model;	

	// Classify the image.
	if (!model) {
		let [error, loadModel] = await _p(
			// Load the model.
			cocoSsd.load()
		);
		if (loadModel){
			model = loadModel;
			console.log("Predictions: ".blue);

			let [err, predictions] = await _p(
				model.detect(img)
			);
			if (predictions) {
				console.log(predictions);
				return res.status(200).json(createResponse(predictions, 'Image detection successfully'));
			}
			if (err) {
				console.log(err.red);
				return next(new Error("Image detection failed"));
			}
		}
		if (error) {
			console.log(error.red);
			return next(new Error("Model load failed"));
		}
		
	}else{
		console.log("Predictions: ".green);

		let [err, predictions] = await _p(
			model.detect(img)
		);
		if (predictions) {
			console.log(predictions);
			return res.status(200).json(createResponse(predictions, 'Image detection successfully'));
		}
		if (err) {
			console.log(error.red);
			return next(new Error("Image detection failed"));
		}
	}
};
