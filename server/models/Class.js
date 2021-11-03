const { Schema, SchemaTypes, model } = require('mongoose');

const ClassSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: SchemaTypes.ObjectId,
        ref: 'User'
    },
    description: {
        type: String,
        required: true
    },
    previewVideoUrl: {
        type: String
    },
    cost: {
        type: Number,
        required: true
    },
    category: {
        type: SchemaTypes.ObjectId,
        ref: 'Category'
    },
    timesPurchased: {
        type: Number,
    },
    reviews: [{
        type: SchemaTypes.ObjectId,
        ref: 'Review'
    }],
    createdOn: {
        type: Date,
        default: Date.now
    }
},
{
    toJSON: {
        virtuals: true
    }
});

ClassSchema.virtual('popularity').get(function popularity() {
    const val = this.reviews.reduce(
        (total, review) => total + review.rating,
        0
    ) / this.reviews.length;
    return !Number.isNaN(val) ? val : 1;
})

ClassSchema.methods.purchase = function purchase() {
    this.timesPurchased++;
    this.save();
}

const Class = model('Class', ClassSchema);
module.exports = Class;
