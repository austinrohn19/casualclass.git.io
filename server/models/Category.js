const mongoose, { Schema, SchemaTypes } = require('mongoose');

const CategorySchema = new Schema({
    name: {
        type: String,
        required: true
    }
});

const Category = mongoose.model(CategorySchema, 'Category');
module.exports = Category;
