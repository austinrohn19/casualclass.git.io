const { AuthenticationError } = require('apollo-server-express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const {
    User,
    UserRating,
    Class,
    Category,
    Review
} = require('../models');
const { signToken } = require('../utils/auth');


const resolvers = {
    Query: {
        classes: async (parent, { title, category, sortBy }) => {
            const findParams = {}
            if (category) findParams.category = category
            if (title) findParams.title = { $regex: `^${title}`, $options: 'i' }
            return await Class.find(findParams)
                .populate([
                    {
                        path: 'author',
                        populate: {
                            path: 'userRatings',
                            populate: 'user'
                        }
                    },
                    {
                        path: 'category'
                    },
                    {
                        path: 'reviews',
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
                        populate: {
                            path: 'userRatings',
                            populate: 'user'
                        }
                    },
                    {
                        path: 'category'
                    },
                    {
                        path: 'reviews',
                        populate: {
                            path: 'author'
                        }
                    }
                ]);
        },

        categories: async () => {
            return await Category.find({});
        },

        user: async (parent, { id }) => {
            return await User.findById(id)
                .populate([
                    {
                        path: 'userRatings',
                        populate: {
                            path: 'user'
                        }
                    },
                    {
                        path: 'createdClasses',
                        populate: [
                            {
                                path: 'author',
                            },
                            {
                                path: 'category'
                            },
                            {
                                path: 'reviews',
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
                                path: 'reviews',
                                populate: {
                                    path: 'author'
                                }
                            }
                        ]
                    }
                ]);
        },

        me: async (parent, args, { user }) => {
            if (user) {
                return await User.findById(user._id)
                    .populate([
                        {
                            path: 'userRatings',
                            populate: {
                                path: 'user'
                            }
                        },
                        {
                            path: 'createdClasses',
                            populate: [
                                {
                                    path: 'author',
                                },
                                {
                                    path: 'category'
                                },
                                {
                                    path: 'reviews',
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
                                    path: 'reviews',
                                    populate: {
                                        path: 'author'
                                    }
                                }
                            ]
                        }
                    ]);

            }
            return null;
        },

        checkout: async (parent, { donationAmount }, context) => {
            const url = new URL(context.headers.referer).origin;

            const product = await stripe.products.create({
                name: `$${donationAmount} Donation`
            });

            const price = await stripe.prices.create({
                product: product.id,
                unit_amount: donationAmount * 100,
                currency: 'usd'
            });

            const line_items = [{
                price: price.id,
                quantity: 1
            }];

            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items,
                mode: 'payment',
                success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${url}/`
            });

            return { session: session.id };
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

            if (!user) {
                throw new AuthenticationError('No user with this email found!');
            }

            const correctPassword = await user.checkPassword(password);

            if (!correctPassword) {
                throw new AuthenticationError('Incorrect password!');
            }

            const token = signToken(user);
            return { token, user };
        },

        joinClass: async (parent, { classId }, { user }) => {
            if (!user) {
                throw new AuthenticationError('Unauthorized action');
            }
            const joinedClass = await Class.findById(classId)
                .populate([
                    {
                        path: 'author',
                        populate: {
                            path: 'userRatings',
                            populate: 'user'
                        }
                    },
                    {
                        path: 'category'
                    },
                    {
                        path: 'reviews',
                        populate: {
                            path: 'author'
                        }
                    }
                ]);

            await user.joinClass(joinedClass);

            return joinedClass;
        },

        // User rating mutation
        rateUser: async (parent, { ratedUserId, value }, { user }) => {
            if (!user) {
                throw new AuthenticationError('Unauthorized action');
            }
            const userRating = await UserRating.create({
                user: user._id,
                ratedUser: ratedUser._id,
                value
            });

            const ratedUser = await User.findById(ratedUserId)
                .populate([
                    {
                        path: 'userRatings',
                        populate: {
                            path: 'user'
                        }
                    },
                    {
                        path: 'createdClasses',
                        populate: [
                            {
                                path: 'author',
                            },
                            {
                                path: 'category'
                            },
                            {
                                path: 'reviews',
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
                                path: 'reviews',
                                populate: {
                                    path: 'author'
                                }
                            }
                        ]
                    }
                ]);

            await ratedUser.addUserRating(userRating);

            return ratedUser;
        },

        // Category mutations
        createCategory: async (parent, { name }) => {
            const category = await Category.create({ name });
            return category;
        },

        // Class mutations
        createClass: async (parent, args, { user }) => {
            if (!user) {
                throw new AuthenticationError('Unauthorized action');
            }
            const newClass = await Class.create({
                ...args,
                author: user._id
            });
            const author = await User.findById(user._id);

            await author.addCreatedClass(newClass);
            return newClass;
        },

        // Review mutations
        createReview: async (parent, args, { user }) => {
            if (!user) {
                throw new AuthenticationError('Unauthorized action');
            }

            const newReviewId = (await Review.create({
                ...args,
                author: user._id,
                class: args.classId
            }))._id;
            const newReview = await Review.findById(newReviewId)
                .populate([
                    {
                        path: 'author',
                        populate: [
                            {
                                path: 'userRatings',
                                populate: {
                                    path: 'user'
                                }
                            },
                            {
                                path: 'createdClasses',
                                populate: [
                                    {
                                        path: 'author',
                                    },
                                    {
                                        path: 'category'
                                    },
                                    {
                                        path: 'reviews',
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
                                        path: 'reviews',
                                        populate: {
                                            path: 'author'
                                        }
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        path: 'class',
                        populate: [
                            {
                                path: 'author',
                                populate: {
                                    path: 'userRatings',
                                    populate: 'user'
                                }
                            },
                            {
                                path: 'category'
                            },
                            {
                                path: 'reviews',
                                populate: {
                                    path: 'author'
                                }
                            }
                        ]
                    }
                ]);

            const reviewedClass = await Class.findById(args.classId);
            await reviewedClass.addReview(newReview);

            return newReview;
        }
    }
};

module.exports = resolvers;