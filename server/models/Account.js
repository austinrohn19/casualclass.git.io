const { Schema, SchemaTypes, model } = require('mongoose');

const AccountSchema = new Schema({
    user: {
        type: SchemaTypes.ObjectId,
        ref: 'User'
    },
    createdClasses: [{
        type: SchemaTypes.ObjectId,
        ref: 'Class'
    }],
    joinedClasses: [{
        type: SchemaTypes.ObjectId,
        ref: 'Class'
    }]
});

AccountSchema.methods.addCreatedClass = function addCreatedClass(newClass) {
    this.createdClasses.push(newClass);
    this.save();
}

AccountSchema.methods.joinClass = function joinClass(newClass) {
    this.joinedClasses.push(newClass);
    this.save();
}

const Account = mongoose.model(AccountSchema, 'Account');
module.exports = Account;
