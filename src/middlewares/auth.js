const jwt           = require('../helpers/jwt');
const axios         = require('axios');
const _log          = require('../utils/logger');
const _p       		= require('../helpers/simpleasync');
const fixed_tokens  = require('../configs/tokens.json');
const _uthorization = require('../configs/acl.json');
const authorization = {};

for (let role in _uthorization) {
	authorization[role] = _uthorization[role].map(p => {
		let portions = p.toLowerCase().split('|');
		let methods = ['*'];
		let url     = portions[portions.length-1].trim();
		if(portions.length===2){
			methods = portions[0].split(',').map(e=>e.trim());
		}
		return {
			len: url.length,
			orig: url,
			chunk: url.split('/'),
			methods: methods
		};
	});
}
//console.log(authorization);
//Note: Use the Error codes from language file in the languages folder
function checkAuthorization(payload, req) {
	let role = payload.type || payload.role;
	if (!role) {
		role = 'basic';
	}
	// _log(`User role ${role}`, 'green');
	let ruleset = authorization[role];
	if (!ruleset) return false;
	//console.log(ruleset);
	let _path = req.originalUrl.toLowerCase().split('#')[0].split('?')[0];
	let _method = req.method.trim().toLowerCase();
	let found = false;
	for (let i = 0; i < ruleset.length; i++) {
		if (found) break;
		let pt = ruleset[i];
		if (pt.length > _path.len) continue;
		//console.log(pt);
		let pieces = _path.split('/');
		//console.log(pt.chunk);
		for (let j = 0; j < pt.chunk.length; j++) {
			if (found) break;
			if (pt.chunk[j] === pieces[j] || pt.chunk[j] === '*') {
				//console.log(pt.chunk[j],pieces[j]);
				//console.log(j,pt.chunk.length);
				if (j === pt.chunk.length - 1) {
					if(pt.methods.indexOf('*')!==-1 || pt.methods.indexOf(_method)!==-1){
						found = true;
						break;
					}
				} else {
					continue;
				}
			} else {
				break;
			}
		}
	}
	return found;
}

// module.exports.jwt = async function(req, res, next) {
// 	let token = req.header('authorization') || req.header('token') || req.query.token;
// 	if (!token) {
// 		return next(new Error('auth_token_absent'));
// 	}
// 	const payload = await jwt.decode(token);
// 	if (!payload) return next(new Error('auth_token_invalid'));
	// check user by token id
	// const url = `http://backend-nodejs-app:3000/api/v1/pvt/users/${payload._id}`;
	// const method = 'get';
	// const headers= {token};
	// find user
	// const [userErr, user] =  await _p(axios({
	// 	method,
	// 	url,
	// 	headers
	// }));
	// if (!userErr) {l
	// 	// _log(user.data.data, 'cyan');
	// 	let authorized = checkAuthorization(payload, req);
	// 	if (!authorized) {
	// 		return next(new Error('auth_user_unauthorized'));
	// 	}
	// 	req.user = payload;
	// 	// Your Middleware code here
	// 	next();
	// } else {
		// _log(userErr.message, 'red');
		// return next(new Error(`token not valid, ${userErr.message}`));
	// }
// };
	module.exports.jwt = async function(req, res, next) {
		let token = req.header('authorization') || req.header('token') || req.query.token;
		if (!token) {
			return next(new Error('auth_token_absent'));
		}
		const payload = await jwt.decode(token);
		if (!payload) return next(new Error('auth_token_invalid'));
		let authorized = checkAuthorization(payload, req);
		if (!authorized) {
			return next(new Error('auth_user_unauthorized'));
		}
		req.user = payload;
		// _log(`User ${payload.phone} was Granted HTTP access`, 'green');
		// Your Middleware code here
		next();
	};
/**It is not possible to give a JWT token to other Application (not talking about the mobile and web app)
 * that needs to consume the API for handymama. Maybe a third party applicatio wants to show
 * list of tasks available at Handymama. Those needs to be authenticated in some way. Hence fixed auth.
 * generate a sha256 hash of the `thirdparty_app_name:thirdparty_app_secret:random_number` and store it into the
 * configs/tokens.json file. Then the apps can access the Third Party API with the token.
 * USe the following middleware to authenticate those API
 */
module.exports.app2app = function(req, res, next) {
	let token = req.header('authorization') || req.header('token') || req.query.token;
	if (!token) {
		return next(new Error('auth_token_absent'));
	}
	let appName = null;
	for (let extapp in fixed_tokens) {
		if (fixed_tokens[extapp] === token) {
			appName = extapp;
			break;
		}
	}
	if (appName) {
		_log(`APP ${appName} was granted HTTP Authentication`);
		return next();
	} else {
		return next(new Error('auth_token_invalid'));
	}
};
