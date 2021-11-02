const { Schema, SchemaTypes, model } = require('mongoose');

const ReviewSchema = new Schema({
    class: {
        type: SchemaTypes.ObjectId,
        ref: 'Class',
        required: true
    },
    author: {
        type: SchemaTypes.ObjectId,
        ref: 'User',
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    text: {
        type: String
    },
    createdOn: {
        type: Date,
        default: Date.now
    }
});

const Review = model('Review', ReviewSchema);
module.exports = Review;
