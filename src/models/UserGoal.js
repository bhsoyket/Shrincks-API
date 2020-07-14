const mongoose 		= require('mongoose');
const { Schema } 	= mongoose;
const objectID      = Schema.ObjectId;
mongoose.Promise 	= global.Promise;

const userGoalSchema = new Schema({
	goalId: {
		type: Number,
		required: true
	},
	userId: {
		type: Number,
		required: true
	},
	user: {
		type: objectID,
        ref: 'User'
	},
	goal: {
		type: objectID,
        ref: 'Goal'
	},
	createdAt: {
		type: Date,
		required: true
	},
	completedAt: {
		type: Date
	}
}, { timestamps: true });

module.exports = mongoose.model('UserGoal', userGoalSchema);


