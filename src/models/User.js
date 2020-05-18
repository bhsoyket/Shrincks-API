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
		required: 'Please enter a user email',
		trim: true
	},
	password: {
		type: String,
		required: 'Please enter a user password',
		trim: true
	},
	status: {
		type: Boolean,
		required: true
	}
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);


