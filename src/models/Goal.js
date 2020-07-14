const mongoose 		= require('mongoose');
const { Schema } 	= mongoose;
mongoose.Promise 	= global.Promise;

const goalSchema = new Schema({
	goalId: {
		type: Number,
		required: true
	},
	title: {
		type: String,
		required: true,
		trim: true
	},
	icon: {
		type: String,
		required: true,
		trim: true
	},
	description: {
		type: String,
		required: true,
		trim: true
	}
}, { timestamps: true });

module.exports = mongoose.model('Goal', goalSchema);


