const colors       			= require('colors');
const _p       				= require('../helpers/simpleasync');
const { createResponse }    = require('../utils/responseGenerate');
const mbxClient = require('@mapbox/mapbox-sdk');


const datasetsClient = mbxClient({ accessToken: process.env.MAPBOX_TOKEN });


module.exports.updateGeojson = async (req, res,next) => {
	console.log(datasetsClient);
	
	datasetsClient.listDatasets()
		.send()
		.then(response => {
			const datasets = response.body;
			console.log(datasets);
		});

	return res.status(200).json(createResponse(area, 'area created successfully'));
};
