const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    size: {
        type: String,
        required: true
    },
    color: {
        type: String
    },
    price: {
        type: Number,
        required: true
    },
    category: { type: Schema.Types.ObjectId, ref: 'Category' }
});

const Product = mongoose.model('Product', productSchema, 'Product');

module.exports = Product;