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
        createdOn: String
        popularity: Float
    }

    type Review {
        _id: ID
        class: Class
        author: User
        rating: Int
        text: String
        createdOn: String
    }

    type Category {
        name: String
    }

    type Auth {
        token: String
        user: User
    }

    type Query {
        user: User
        class: Class
    }

    type Mutation {
        createUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth

        joinClass(userId: ID!, classId: ID!): Class
        rateUser(userId: ID!, ratedUserId: ID!, value: Int!): User

        createCategory(name: String!): Category
        createClass(title: String!, author: ID!, description: String!, previewVideoUrl: String!, cost: Float!, category: ID!): Class
        createReview(class: ID!, author: ID!, rating: Int!, text: String!): Review
    }
`;

module.exports = typeDefs;