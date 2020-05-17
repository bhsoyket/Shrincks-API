const _log                        = require('../utils/logger');
const {createResponse}            = require('../utils/responseGenerate');
const {error_codes}               = require('../languages/en_us.json');

module.exports = function(err,req,res,next){
	if(err){
		_log(`Error: ${req.method} request from ${req.ip} on route ${req.path}`,'red');
		res
			.status(err.status || 500)
			.json(createResponse(
				null,
				error_codes[err.message] || err.message,
				true)
			);
	}
};
