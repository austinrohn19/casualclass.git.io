import { gql } from '@apollo/client'

export const CREATE_USER = gql`
    mutation  createUser($username: String!, $email: String!, $password: String!) {
        createUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
                email
            }
        }
    }

`

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                username
                email
            }
        }
    }
`

export const JOIN_CLASS = gql`
    mutation joinClass($userId: String!, $classId: String!) {
        joinClass(userId: $userId, classId: $classId) {
            class {
                title
                author
                category
            }
        }
    }
`

export const RATE_USER = gql`
    mutation rateUser($userId: ID!, $ratedUserId: ID!, $value: Int!) {
        rateUser(userId: $userId, ratedUser: $ratedUser, value: $value) {
            user {
                username
                userRatings {
                    user {
                        username
                    }
                    value
                }
            }
        }
    }
`
export const CREATE_CATEGORY = gql`
    mutation createCategory($name: String!) {
        createCategory(name: $name) {
            category {
                name
            }
        }
    }
`

export const CREATE_CLASS = gql`
    mutation createClass($title: String!, $author: ID!, $description: String!, $previewVideoUrl: String!, $cost: Float!, $category: ID!) {
        createClass(title: $title, author: $author, description: $description, previewVideoUrl: $previewVideoUrl, cost: $cost, category: $category) {
            class {
                title
                author
                description
                cost
                category {
                    name
                }
            }
        }
    }
`