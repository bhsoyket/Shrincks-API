// const rc	=	require('../helpers/redis');
const _p	=	require('../helpers/simpleasync');

module.exports = async (req, res, next) => {
	const [err, data] = await _p(rc.getAsync(req.params.id));
	if(err) return Promise.reject('Error from Redis cache');
	if(data) {
		console.log('Serve from cache');
		return res.json(JSON.parse(data));
	}
	console.log('Cache not found');
	next();
};
