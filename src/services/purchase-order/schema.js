const mongoose = require('mongoose')
const { padLeadingZeros } = require('../../helper/number')

var CounterSchema = mongoose.Schema({
    _id: { type: String, required: true },
    seq: { type: Number, default: 1 }
});
const counter = mongoose.model('counter', CounterSchema);

const itemSchema = mongoose.Schema({
    item_name: {
        type: String,
        required: true
    },
    qty: {
        type: Number,
        required: true
    },
    amount: {
        type: Number,
        required: true
    }
})

const PurchaseOrderSchema = mongoose.Schema({
    order_id: {
        type: String,
        unique: true
    },
    order_date: {
        type: Date,
        required: true
    },
    expiry_date: {
        type: Date,
        required: true
    },
    company: {
        type: Object,
        required: true
    },
    wallet_type: {
        type: String,
        required: true
    },
    items: [itemSchema],
    payment_status: {
        type: String,
        enum: ['unpaid', 'paid', 'expired', 'refunded'],
        required: true
    },
    order_status: {
        type: String,
        enum: ['completed', 'pending', 'canceled'],
        required: true
    },
    created_at: {
        type: Date,
        required: true
    },
    updated_at: {
        type: Date,
        default: null
    },
    deleted_at: {
        type: Date,
        default: null
    }
});

PurchaseOrderSchema.pre('save', function (next) {
    var doc = this;
    counter.findOneAndUpdate({ _id: 'PO' }, { $inc: { seq: 1 } }, {
        new: true,
        upsert: true,
        rawResult: true
    }, function (error, counter) {
        if (error)
            return next(error);

        doc.order_id = 'PO-' + padLeadingZeros(counter.value.seq, 5)
        next();
    });
});

module.exports = mongoose.model('order', PurchaseOrderSchema, 'order');