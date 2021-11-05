import { gql } from '@apollo/client'

export const QUERY_CLASSES = gql`
    query classes {
        class {
            title
            author {
                username
                email
            }
            description
            previewVideoUrl
            category {
                name
            }
            reviews {
                author
                rating
                text
                createdOn
            }
            createdOn
            popularity
            cost
        }
    }
`

export const QUERY_CLASS = gql`
    query class($_id: ID!) {
        class(_id: $_id) {
            title
            author {
                username
                email
            }
            description
            previewVideoUrl
            category {
                name
            }
            reviews {
                author
                rating
                text
                createdOn
            }
            createdOn
            popularity
            cost
        }
    }
`

export const QUERY_CATEGORIES = gql`
    query categories {
        category {
            _id
            name
        }
    }
`

export const QUERY_USER = gql`
    query user($_id: ID!) {
        user(_id: $_id) {
            username
            email
            userRatings
            createdClasses
            averageRating
        }
    }
`

export const QUERY_ME = gql`
    query me {
        username 
        email
        userRatings
        createdClasses
        averageRating
    }
`




