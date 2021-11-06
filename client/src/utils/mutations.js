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
    mutation joinClass($classId: ID!) {
        joinClass(classId: $classId) {
            title
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
    mutation createClass($title: String!, $description: String!, $previewVideoUrl: String!, $previewImageUrl: String! $cost: Float!, $category: ID!) {
        createClass(title: $title, description: $description, previewVideoUrl: $previewVideoUrl, previewImageUrl: $previewImageUrl, cost: $cost, category: $category) {
            title
            author {
                username
            }
            description
            cost
            category {
                name
            }
        }
    }
`


