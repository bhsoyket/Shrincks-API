const mongoose = require('mongoose');
const _log     = require('../utils/logger');
const conf     = require('../configs/common.json');
const cache    = require('mongoose-cachebox');

const _options = {
	ttl   : parseInt(conf.database.cache_ttl),
	cache : true
};

cache(mongoose,_options);

let dbUrl = '';

if (process.env.NODE_ENV === "production") {
	dbUrl = process.env.MONGODB_URI;
}

if (process.env.NODE_ENV === "test") {
	dbUrl = process.env.MONGODB_TEST_URI;
}

if (process.env.NODE_ENV === "development") {
	dbUrl = process.env.MONGODB_DEV_URI;
}

if(!dbUrl) {
	_log('Mongo url not set in env file', 'red');
	return new Error('Mongo url not set in env file');
}
mongoose.connect(dbUrl, { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true, useUnifiedTopology: true }, error => {
	if (error) {
		_log(`FAILED to connect using mongoose. ${error}`, 'red');
	} else {
		_log(`Connected to DB server. ( ${process.env.NODE_ENV} )`, 'green');
	}
});

//Cache

module.exports = mongoose;
