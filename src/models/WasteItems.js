const mongoose 		= require('mongoose');
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
    category: {
        type: objectID,
        ref: 'WasteCategories'
    }
}, { timestamps: true });

module.exports = mongoose.model('WasteItems', WasteItemsSchema);
