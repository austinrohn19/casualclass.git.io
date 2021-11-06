import { gql } from '@apollo/client'

export const QUERY_CLASSES = gql`
    query classes($category: ID, $title: String, $sortBy: String) {
        classes(category: $category, title: $title, sortBy: $sortBy) {
            _id
            title
            author {
                username
                email
            }
            description
            previewVideoUrl
            previewImageUrl
            category {
                name
            }
            reviews {
                author {
                    username
                }
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
    query class($id: ID!) {
        class(id: $id) {
            _id
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
                author {
                    username
                }
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
        categories {
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
            userRatings {
                _id
                user {
                    _id
                    username
                }
                value
            }
            createdClasses {
                _id
                title
                description
                author {
                    _id
                    username
                }
            }
            joinedClasses {
                _id
                title
                description
                author {
                    _id
                    username
                }
            }
            averageRating
        }
    }
`

export const QUERY_ME = gql`
    query me {
        me {
            _id
            username 
            email
            userRatings {
                _id
                user {
                    _id
                    username
                }
                value
            }
            createdClasses {
                _id
                title
                description
                author {
                    _id
                    username
                }
            }
            joinedClasses {
                _id
                title
                description
                author {
                    _id
                    username
                }
            }
            averageRating
        }
    }
`
export const QUERY_CHECKOUT = gql`
    query checkout($donationAmount: Float!) {
        checkout(donationAmount: $donationAmount) {
            session
        }
    }
`;
