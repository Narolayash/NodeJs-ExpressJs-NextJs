const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    productId: { type: String, required: true, unique: true, trim: true },
    productName: { type: String, required: true, trim: true },
    category: { type: String, required: true, enum: ['Electronics', 'Books'] },
    brand: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    quantity: { type: Number, required: true, min: 0 },
    sku: { type: String, required: true, unique: true, trim: true },
    description: { type: String },
    supplierName: { type: String, required: true, trim: true },
    isAvailable: { type: Boolean, default: true }
}, {
    timestamps: true
});

module.exports = mongoose.model('Product', productSchema);
