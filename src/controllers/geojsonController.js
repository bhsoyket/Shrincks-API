const colors = require('colors');
const _p = require('../helpers/simpleasync');
const { createResponse } = require('../utils/responseGenerate');
const axios = require('axios');
const short = require('short-uuid');



module.exports.updateGeojson = async (req, res) => {
	const reqData = req.body;
	const token = process.env.MAPBOX_TOKEN;
	const feature_id = short.generate();
	const url = `https://api.mapbox.com/datasets/v1/mahmudz/ckfwri4uh18fm2bnu88vx35a0/features/${feature_id}?access_token=${token}`;
	const config = { headers: {'Content-Type': 'application/json'} };
	const payload = {
		"id": feature_id,
		"type": "Feature",
		"geometry": {
		  "type": "Point",
		  "coordinates": reqData.geometry.coordinates
		},
		"properties": {
		  "type": reqData.properties.type
		}
	  };

	axios.put(url, payload)
		.then(function (response) {
			// handle success
			return res.status(200).json(createResponse(response.data, 'Feature created successfully'));
		})
		.catch(function (error) {
			// handle error
			console.log(error);
			return res.status(200).json(createResponse(error, 'Feature not created'));
		})















	// const datasetsClient = mbxClient({ accessToken: process.env.MAPBOX_TOKEN });
	// const datasets = datasetsClient.listDatasets()
	// 	.send()
	// 	.then(response => {
	// 		return response.body;
	// 	});

	// return res.status(200).json(createResponse(datasets, 'area created successfully'));
};
