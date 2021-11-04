const { AuthenticationError } = require('apollo-server-express');
const { 
    User,
    UserRating,
    Class,
    Category
} = require('../models');
const { signToken } = require('../utils/auth');


const resolvers = {
    Query: {
        classes: async (parent, { sortBy }) => {
            return await Class.find({})
                .populate([
                    {
                        path: 'author',
                    },
                    {
                        path: 'category'
                    },
                    {
                        path:'reviews',
                        populate: {
                            path: 'author'
                        }
                    }           
                ])
                .sort(sortBy ? sortBy : 'createdOn');
        },

        class: async (parent, { id }) => {
            return await Class.findById(id)
                .populate([
                    {
                        path: 'author',
                    },
                    {
                        path: 'category'
                    },
                    {
                        path:'reviews',
                        populate: {
                            path: 'author'
                        }
                    }           
                ]);
        },

        user: async (parent, { id }) => {
            return await User.findById(id)
                .populate([
                    {
                        path:'userRatings',
                        populate: {
                            path: 'user'
                        }
                    },
                    {
                        path: 'createdClasses',
                        populate : [
                            {
                                path: 'author',
                            },
                            {
                                path: 'category'
                            },
                            {
                                path:'reviews',
                                populate: {
                                    path: 'author'
                                }
                            }           
                        ]
                    },
                    {
                        path: 'joinedClasses',
                        populate: [
                            {
                                path: 'author',
                            },
                            {
                                path: 'category'
                            },
                            {
                                path:'reviews',
                                populate: {
                                    path: 'author'
                                }
                            }           
                        ]
                    }
                ]);
        }
    },

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

        // Category mutations
        createCategory: async (parent, { name }) => {
            const category = await Category.create({ name });
            return category;
        },

        // Class mutations
        createClass: async (parent, args) => {
            const newClass = await Class.create({...args});
            const userId = args.author;
            const author = await User.findOne({_id: userId});

            author.addCreatedClass(newClass);
            return newClass;
        }
        
        // Review mutations
        
    }
};

module.exports =  resolvers;