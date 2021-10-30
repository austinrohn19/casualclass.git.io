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

        }
    ]



    return (
        <div>
            <Grid stackable columns='equal'>
                <Grid.Row>
                    <Grid.Column>
                        <Card fluid>
                            <Card.Content>
                                <Card.Group>
                                    {lessons.map(lessonInfo => {
                                        return (
                                            <LessonCard key={lessonInfo.title} lessonInfo={lessonInfo} />
                                        )
                                    })}
                                </Card.Group>
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                    <Grid.Column floated='right'>
                        <Card fluid>
                            <Card.Content>
                                <SearchForm />
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
    )
}

export default homePage;