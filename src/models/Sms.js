const mongoose 		= require('mongoose');
const { Schema } 	= mongoose;
mongoose.Promise 	= global.Promise;

const smsSchema = new Schema({
	smsId: {
		type: String,
		required: true
	},
	client: {
		type: String,
		required: 'Please enter a client name'
	},
	customerPhone: {
		type: String,
		required: 'Please enter a customer phone number'
	},
	message: {
		type: String,
		required: 'Please enter message text'
	},
	status: {
		type: String,
		required: 'Please enter message status'
	},
	sendAt: {
		type: Date,
		required: false
	}
}, { timestamps: true });

module.exports = mongoose.model('Sms', smsSchema);


