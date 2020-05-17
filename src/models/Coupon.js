const mongoose 		= require('mongoose'); //const db = require('../db/db');
const { Schema } 	= mongoose;
mongoose.Promise 	= global.Promise;

const couponSchema = new Schema({
    name: {
        type: String,
        required: 'Please enter a coupon name',
        trim: true
    },
    code: {
        type: String,
        required: 'Please enter a coupon code',
        trim: true,
		unique: true,
		lowercase: true
    },
    discountType: {
        type: String,
        required: 'Please enter a discount type',
        trim: true
    },
    amount: {
        type: Number,
        required: 'Please enter a amount'
    },
    maxAmount: {
        type: Number,
        required: false
    },
    usagesLimitCoupon: {
        type: Number,
        required: 'Please enter a limit coupon number'
    },
    usagesLimitUser: {
        type: Number,
        required: 'Please enter a limit user number'
    },
    usagesLimitPerUser: {
        type: Number,
        required: 'Please enter a limit per user number'
    },
    service: {
        type: String,
        required: false,
        trim: true
    },
    subService: {
        type: String,
        required: false,
        trim: true
    },
    product: {
        type: String,
        required: false,
        trim: true
    },
    description: {
        type: String,
        required: false,
        trim: true
    },
    validity: {
        from: {
            type: Date,
            required: 'Please enter a from date'
        },
        to: {
            type: Date,
            required: 'Please enter a to date'
        }
    },
    status: {
        type: String,
        required: 'Please enter a status',
        trim: true
    },
    users: {
        type: [
            {
                id: {
                    type: String,
                    required: 'Please enter a user id'
                },
                time: {
                    type: Date,
                    required: 'Please enter a using time'
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

module.exports = mongoose.model('Coupon', couponSchema);
