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

UserSchema.methods.addUserRating = function addUserRating(userRating) {
    this.userRatings.push(userRating);
    this.save();
}

UserSchema.virtual('averageRating').get(function averageRating() {
    const val = this.userRatings.reduce(
        (total, rating) => total + rating.value,
        0
    ) / this.userRatings.length;
    return !Number.isNaN(val) ? val : 0;
});

UserSchema.methods.addCreatedClass = async function addCreatedClass(newClass) {
    this.createdClasses.push(newClass._id);
    await this.save();
}

UserSchema.methods.joinClass = async function joinClass(newClass) {
    this.joinedClasses.push(newClass._id);
    await this.save();
}

const User = model('User', UserSchema);
module.exports = User;
