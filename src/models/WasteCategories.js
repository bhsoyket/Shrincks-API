const mongoose 		= require('mongoose'); //const db = require('../db/db');
const { Schema } 	= mongoose;
const objectID      = Schema.ObjectId;
mongoose.Promise 	= global.Promise;

const wasteCategoriesSchema = new Schema({
    categoryId: {
		type: String,
		unique: true
	},
    name: {
        type: String,
        required: 'Please enter a category name',
        trim: true
    },
    icon: {
        type: String,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    items: [{
        type: objectID,
        ref: 'WasteItems'
    }]
}, { timestamps: true });

module.exports = mongoose.model('WasteCategories', wasteCategoriesSchema);
