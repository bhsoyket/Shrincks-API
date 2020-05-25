const mongoose 		= require('mongoose');
const { Schema } 	= mongoose;
const objectID      = Schema.ObjectId;
mongoose.Promise 	= global.Promise;

const goalSchema = new Schema({
	userId: {
		type: String // Should store UID
	},
	user: {
		type: ObjectId,
		ref: 'User'
	},
	coords: {
		type: String, // Should store lat,lng
		required: true
	},
	type: {
		type: Number, // Either 1/2: 1 - Bin, 2 - Clean Place 
		required: true
	},
	description: {
		type: String,
		required: true,
		trim: true
	}
}, { timestamps: true });

module.exports = mongoose.model('Goal', goalSchema);


