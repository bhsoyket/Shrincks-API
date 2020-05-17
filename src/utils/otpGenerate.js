const chance = require('chance').Chance();

module.exports.otp = function () {
	return new Promise(async (resolve, reject) => {
		const otp = chance.natural({ min: 1000, max: 9999 });
		if(typeof otp === 'number') {
			resolve(otp);
		}  else {
			reject(new Error('Faild to generate otp.'));
		}
	});
};

