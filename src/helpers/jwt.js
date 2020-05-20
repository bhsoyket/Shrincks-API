const jwt  		= require('jsonwebtoken');
const colors    = require('colors');

module.exports.encode = function(payload){
	return new Promise((resolve,reject)=>{
		jwt.sign(payload,'secretPassword',(err,token)=>{
			if(err){
				console.log(err.message.red || 'JWT Encoding Error'.red);
				return resolve(null);
			}
			else{
				resolve(token);
			}
		});
	});
};

module.exports.decode = function(token){
	return new Promise((resolve,reject)=>{
		jwt.verify(token,'secretPassword',(err,payload)=>{
			if(err){
				console.log(err.message.red || 'JWT Decoding Error'.red);
				return resolve(null);
			}
			else{
				resolve(payload);
			}
		});
	});
};
