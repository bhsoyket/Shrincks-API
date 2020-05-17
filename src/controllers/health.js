const os    = require('os');
// const redis = require('../helpers/redis');

module.exports.check = function(req,res){
	let uptime  = `${Math.floor(process.uptime())}s`;
	let loadavg = os.loadavg()[2];
	let time    = new Date().toTimeString(); 
	res.json({
		uptime,
		loadavg,
		time,
		redis:redis._connection_status
	});
};

module.exports.loopback = function(req,res){
	let ip   = req.ip;
	let ua   = req.header('User-Agent');
	res.json({
		ip,
		ua
	});
};