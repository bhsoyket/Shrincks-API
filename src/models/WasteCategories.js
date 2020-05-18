const mongoose 		= require('mongoose'); //const db = require('../db/db');
const { Schema } 	= mongoose;
const objectID      = Schema.ObjectId;
mongoose.Promise 	= global.Promise;

const wasteCategoriesSchema = new Schema({
    categoryId: {
		type: String,
		required: true
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
    items: {
        type: [
            {
                id: {
                    type: objectID,
                    ref: 'WasteItems'
                }
            }
        ],
        default: []
    },
    deletedAt: {
        type: Date,
        required: false
    }
}, { timestamps: true });

module.exports = mongoose.model('WasteCategories', wasteCategoriesSchema);
