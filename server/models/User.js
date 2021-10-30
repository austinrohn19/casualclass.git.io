const { Schema, SchemaTypes, model } = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: /\w+@\w+\.\w{2,3}/
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
        maxLength: 20
    },
    userRatings: [{
        type: SchemaTypes.ObjectId,
        ref: 'UserRating'
    }],
    createdClasses: [{
        type: SchemaTypes.ObjectId,
        ref: 'Class'
    }],
    joinedClasses: [{
        type: SchemaTypes.ObjectId,
        ref: 'Class'
    }]
},
{
    toJSON: {
        virtuals: true
    }
});

UserSchema.pre('init', async function savePassword(next) {
    this.password = await bcrypt.hash(this.password, 10);
    this.save();
    next();
});

UserSchema.methods.checkPassword = async function checkPassword(password) {
    return await bcrypt.compare(password, this.password);
}

UserSchema.methods.addUserRating = function addUserRating(userRating) {
    this.userRatings.push(userRating);
    this.save();
}

UserSchema.virtual('averageRating').get(function averageRating() {
    return this.userRatings.reduce(
        (total, rating) => total + rating.value
    ) / this.userRatings.length;
});

UserSchema.methods.addCreatedClass = function addCreatedClass(newClass) {
    this.createdClasses.push(newClass);
    this.save();
}

UserSchema.methods.joinClass = function joinClass(newClass) {
    this.joinedClasses.push(newClass);
    this.save();
}

const User = model('User', UserSchema);
module.exports = User;
