const mongoose 		= require('mongoose');
const { Schema } 	= mongoose;
mongoose.Promise 	= global.Promise;
const objectID      = Schema.ObjectId;

const areaSchema = new Schema({
	userId: {
        type: objectID,
		required: true
	},
	type: {
		type: String,
		trim: true
	},
	coords: {
		type: String,
		trim: true,
	}
}, { timestamps: true });

module.exports = mongoose.model('Area', areaSchema);


