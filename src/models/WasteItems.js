const mongoose 		= require('mongoose'); //const db = require('../db/db');
const { Schema } 	= mongoose;
const objectID      = Schema.ObjectId;
mongoose.Promise 	= global.Promise;

const WasteItemsSchema = new Schema({
    itemId: {
		type: String,
		required: true
	},
    name: {
        type: String,
        required: 'Please enter a item name',
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
    reduceWay: {
        type: String,
        trim: true
    },
    categoryId: {
        type: objectID,
        ref: 'WasteCategories'
    },
    deletedAt: {
        type: Date,
        required: false
    }
}, { timestamps: true });

module.exports = mongoose.model('WasteItems', WasteItemsSchema);
