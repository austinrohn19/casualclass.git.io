const { Schema, model } = require('mongoose');

const CategorySchema = new Schema({
    name: {
        type: String,
        required: true
    }
});

const Category = model(CategorySchema, 'Category');
module.exports = Category;
