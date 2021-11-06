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
    previewImageUrl: {
        type: String
    },
    cost: {
        type: Number,
        required: true,
        default: 0,
        min: 0
    },
    category: {
        type: SchemaTypes.ObjectId,
        ref: 'Category'
    },
    timesPurchased: {
        type: Number,
        default: 0
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
    return !Number.isNaN(val) ? val : 0;
})

ClassSchema.methods.purchase = async function purchase() {
    this.timesPurchased++;
    await this.save();
}

ClassSchema.methods.addReview = async function addReview(review) {
    this.reviews.push(review);
    await this.save();
}

const Class = model('Class', ClassSchema);
module.exports = Class;
