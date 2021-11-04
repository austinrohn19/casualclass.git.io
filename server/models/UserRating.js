const { Schema, SchemaTypes, model } = require('mongoose');

const UserRatingSchema = new Schema({
    user: {
        type: SchemaTypes.ObjectId,
        ref: 'User',
        required: true
    },
    ratedUser: {
        type: SchemaTypes.ObjectId,
        ref: 'User',
        required: true
    },
    value: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    }
});

const UserRating = model('UserRating', UserRatingSchema);
module.exports = UserRating;
