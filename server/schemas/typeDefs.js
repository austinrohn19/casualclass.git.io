const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        userRatings: [UserRating]
        createdClasses: [Class]
        joinedClasses: [Class]
        averageRating: Float
    }
    
    type UserRating {
        _id: ID
        user: User
        ratedUser: User
        value: Int
    }

    type Class {
        _id: ID
        title: String
        author: User
        description: String
        previewVideoUrl: String
        cost: Float
        category: Category
        timesPurchased: Int
        reviews: [Review]
        createdOn: Date
        popularity: Float
    }

    type Review {
        _id: ID
        class: Class
        author: User
        rating: Int
        text: String
        createdOn: Date
    }

    type Category {
        _id: ID
        name: String
    }

    type Auth {
        token: String
        user: User
    }

    type Query {
        classes(sortBy: String): [Class]
        class(id: ID!): Class
        user(id: ID!): User
        me: User
    }

    scalar Date

    type Mutation {
        createUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth

        joinClass(classId: ID!): Class
        rateUser(ratedUserId: ID!, value: Int!): User

        createCategory(name: String!): Category
        createClass(title: String!, description: String!, previewVideoUrl: String!, cost: Float!, category: ID!): Class

        createReview(classId: ID!, text: String!, rating: Int!): Review
    }
`;

module.exports = typeDefs;