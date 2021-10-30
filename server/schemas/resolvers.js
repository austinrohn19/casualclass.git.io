const { AuthenticationError } = require('apollo-server-express');
const { 
    User,
    UserRating,
    Class,
    Category,
    Review
} = require('../models');
const { signToken } = require('../utils/auth');


const resolvers = {
    // Query: {

    // },

    Mutation: {
        // User model mutations
        createUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            
            return { token, user };
        },

        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

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

        joinClass: async (parent, { userId, classId }) => {
            const joinedClass = await Class.findOne({ classId });
            const user = await User.findOne({ userId });

            user.joinClass(joinedClass);

            return joinedClass;
        },

        // User rating mutation
        rateUser: async (parent, { userId, ratedUserId, value }) => {
            const userRating = await UserRating.create({ userId, ratedUserId, value });

            const ratedUser = await User.findOne({ ratedUserId });

            ratedUser.addUserRating(userRating);

            return ratedUser;
        },

        // Class mutations
        
        // Review mutations
        
    }
};

module.exports =  resolvers;