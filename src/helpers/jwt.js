const jwt  = require('jsonwebtoken');
const fs   = require('fs');
const path = require('path');
const _log = require('../utils/logger');
const _pem = fs.readFileSync(path.resolve(__dirname,'../../keys/mama.key'));
const _pub = fs.readFileSync(path.resolve(__dirname,'../../keys/mama.pub'));

module.exports.encode = function(payload){
	return new Promise((resolve,reject)=>{
		jwt.sign(payload,_pem,{algorithm:'RS256'},(err,token)=>{
			if(err){
				_log(err.message || 'JWT Encoding Error','red');
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
		jwt.verify(token,_pub,{algorithm:'RS256'},(err,payload)=>{
			if(err){
				_log(err.message || 'JWT Decoding Error','red');
				return resolve(null);
			}
			else{
				resolve(payload);
			}
		});
	});
};
