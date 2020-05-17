const jwt = require('./jwt');
const payload = {
	id:10,
	type:'admin',
	name:'Anam',
	ttl:1000
};

jwt.encode(payload)
	.then(token=>{
		console.log(token);
	})
	.catch(error=>{
		console.error(error.message);
	});