const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    category_id: {
        type: Number,
        required: true
    },
    product: [{ type: Schema.Types.ObjectId, ref: 'Product'}]
});

const Category = mongoose.model('Category', categorySchema, 'Category');

module.exports = Category;