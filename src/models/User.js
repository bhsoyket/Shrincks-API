const mongoose 		= require('mongoose');
const { Schema } 	= mongoose;
mongoose.Promise 	= global.Promise;

const userSchema = new Schema({
	userId: {
		type: String,
		required: true
	},
	name: {
		type: String,
		trim: true
	},
	email: {
		type: String,
		trim: true,
		lowercase: true
	},
	password: {
		type: String,
		trim: true
	},
	status: {
		type: String,
		default: 'active'
	}
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);


