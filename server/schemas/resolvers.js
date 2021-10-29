const { AuthenticationError } = require('apollo-server-express');
const { 
    Account,
    User,
    UserRating,
    Class,
    Category,
    Review
} = require('../models');
const { signToken } = require('../utils/auth');


const resolvers = {
    Query: {

    },

    Mutation: {
        createUser: async (parent, args) => {
            return;
        },

        login: async (parent, { email, password }) => {
            const user = await User.findone({ email });

            if(!user) {
                throw new AuthenticationError('No user with this email found!');
            }

            const correctPassword = await user.checkPassword(password);

            if(!correctPassword) {
                throw new AuthenticationError('Incorrect password!');
            }

            const token = signToken(user);
            return { token, user };
        },


    }
};

module.exports =  resolvers;