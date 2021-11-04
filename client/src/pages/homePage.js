import React from 'react';
import { Card, Grid } from 'semantic-ui-react'

import LessonCard from '../components/lessonCard'
import SearchForm from '../components/SearchForm'



const homePage = () => {

    const lessons = [
        {
            title: 'Test Class 1',
            description: 'This is a test description of a class.',
            author: 'Harrison',
            reviews: [],
            reviewScore: 5,
            videos: {
                preview: ["test.test.com"],
                full: ['test.test.com'],
            },
            images: {
                preview: [],
                all: [],
            },
            cost: 5.00,
            category: "Life Lessons",
            tags: ['Easy', 'Bad', 'would not buy'],
            purchases: 15
        },
        {
            title: 'Test Class 2',
            description: 'This is a test description of a class.',
            author: 'Austin',
            reviews: [],
            reviewScore: 5,
            videos: {
                preview: ["test.test.com"],
                full: ['test.test.com'],
            },
            images: {
                preview: [],
                all: [],
            },
            cost: 5.00,
            category: "Music",
            tags: ['Easy', 'Bad', 'guitar'],
            purchases: 15

        },
        {
            title: 'Test Class 2',
            description: 'This is a test description of a class.',
            author: 'Austin',
            reviews: [],
            reviewScore: 5,
            videos: {
                preview: ["test.test.com"],
                full: ['test.test.com'],
            },
            images: {
                preview: [],
                all: [],
            },
            cost: 5.00,
            category: "Music",
            tags: ['Easy', 'Bad', 'guitar'],
            purchases: 15

        },
        {
            title: 'Test Class 2',
            description: 'This is a test description of a class.',
            author: 'Austin',
            reviews: [],
            reviewScore: 5,
            videos: {
                preview: ["test.test.com"],
                full: ['test.test.com'],
            },
            images: {
                preview: [],
                all: [],
            },
            cost: 5.00,
            category: "Music",
            tags: ['Easy', 'Bad', 'guitar'],
            purchases: 15

        },
        {
            title: 'Test Class 2',
            description: 'This is a test description of a class.',
            author: 'Austin',
            reviews: [],
            reviewScore: 5,
            videos: {
                preview: ["test.test.com"],
                full: ['test.test.com'],
            },
            images: {
                preview: [],
                all: [],
            },
            cost: 5.00,
            category: "Music",
            tags: ['Easy', 'Bad', 'guitar'],
            purchases: 15

        },
        {
            title: 'Test Class 2',
            description: 'This is a test description of a class.',
            author: 'Austin',
            reviews: [],
            reviewScore: 5,
            videos: {
                preview: ["test.test.com"],
                full: ['test.test.com'],
            },
            images: {
                preview: [],
                all: [],
            },
            cost: 5.00,
            category: "Music",
            tags: ['Easy', 'Bad', 'guitar'],
            purchases: 15

        }, {
            title: 'Test Class 2',
            description: 'This is a test description of a class.',
            author: 'Austin',
            reviews: [],
            reviewScore: 5,
            videos: {
                preview: ["test.test.com"],
                full: ['test.test.com'],
            },
            images: {
                preview: [],
                all: [],
            },
            cost: 5.00,
            category: "Music",
            tags: ['Easy', 'Bad', 'guitar'],
            purchases: 15

        },
        {
            title: 'Test Class 2',
            description: 'This is a test description of a class.',
            author: 'Austin',
            reviews: [],
            reviewScore: 5,
            videos: {
                preview: ["test.test.com"],
                full: ['test.test.com'],
            },
            images: {
                preview: [],
                all: [],
            },
            cost: 5.00,
            category: "Music",
            tags: ['Easy', 'Bad', 'guitar'],
            purchases: 15

        }
    ]

    return (
        <Grid reversed='mobile' stackable streched columns={2}>
            <Grid.Column mobile={16} tablet={13} computer={13}>
                <Card.Group>
                    {lessons.map((lessonInfo, index) => {
                        return (
                            <LessonCard key={index} lessonInfo={lessonInfo} />
                        )
                    })}
                </Card.Group>
            </Grid.Column>
            <Grid.Column mobile={16} tablet={3} computer={3} floated='right'>
                <SearchForm />
            </Grid.Column>
        </Grid>
    )
}

export default homePage;