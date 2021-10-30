const { Schema, SchemaTypes, model } = require('mongoose');

const UserRatingSchema = new Schema({
    userId: {
        type: SchemaTypes.ObjectId,
        ref: 'User',
        required: true
    },
    ratedUserId: {
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

const UserRating = model(UserRatingSchema, 'UserRating');
module.exports = UserRating;
