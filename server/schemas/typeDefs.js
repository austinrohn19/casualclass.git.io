const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        password: String
        userRatings: [UserRating]
        createdClasses: [Class]
        joinedClasses: [Class]
    }
    
    type UserRating {
        _id: ID
        user: User
        ratedUser: User
        value: Int
    }

    type Class {
        title: String
        author: User
        description: String
        previewVideoUrl: String
        cost: Float
        category: Category
        timesPurchased: Int
        reviews: [Review]
        createdOn: Int
    }

    type Review {
        class: Class
        author: User
        rating: Int
        text: String
        createdOn: Int
    }

    type Category {
        name: String
    }

    type Auth {
        token: ID!
        profile: Profile
    }

    type Query {
        

    }

    type Mutation {
        createUser(username: String!, email: String!, password: String!): Auth

    }
`;

module.exports = typeDefs;