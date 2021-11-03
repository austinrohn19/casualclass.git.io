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

UserSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    next();
});

UserSchema.methods.checkPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

UserSchema.methods.addUserRating = async function addUserRating(userRating) {
    this.userRatings.push(userRating._id);
    this.save();
}

UserSchema.virtual('averageRating').get(function averageRating() {
    if (this.userRatings.length) {
        return this.userRatings.reduce(
            (total, rating) => total + rating.value
        ) / this.userRatings.length;
    } else {
        return 0;
    }
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
