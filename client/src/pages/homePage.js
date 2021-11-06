import React, { useState } from 'react';
import { Card, Grid, Message } from 'semantic-ui-react'

import LessonCard from '../components/lessonCard'
import SearchForm from '../components/SearchForm'

import { useQuery } from '@apollo/client'
import { QUERY_CLASSES } from '../utils/queries'


const HomePage = () => {

    const [searchInput, setSearchInput] = useState({
        title: '',
        category: ''
    })

    const { loading, data } = useQuery(QUERY_CLASSES, {
        variables: { ...searchInput }
    })

    return (
        <>
            <Message>
                <Message.Header>Start Learning</Message.Header>
                <p>Select a class from the list! Register for an account to save classes for future viewing in your account</p>
            </Message>
            <Grid reversed='mobile' stackable streched columns={2}>
                <Grid.Column mobile={16} tablet={13} computer={13}>
                    {loading ? (
                        <div>Loading...</div>
                    ) : (
                        <>
                            {data.classes.length ? (
                                <Card.Group>
                                    {data.classes.map((lesson, index) => {
                                        return (
                                            <LessonCard key={index} lessonInfo={lesson} />
                                        )
                                    })}
                                </Card.Group>
                            ) :
                                (
                                    <div>No Classes Found Matching this search</div>
                                )}
                        </>

                    )}

                </Grid.Column>
                <Grid.Column mobile={16} tablet={3} computer={3} floated='right'>
                    <SearchForm search={setSearchInput} />
                </Grid.Column>
            </Grid>
        </>
    )
}

export default HomePage;