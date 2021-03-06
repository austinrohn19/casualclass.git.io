import React from 'react';
import { useParams } from 'react-router-dom';
import { Grid, Card, Button } from 'semantic-ui-react'

import { useQuery, useMutation } from '@apollo/client';
import { QUERY_CLASS } from '../utils/queries';
import { JOIN_CLASS } from '../utils/mutations'
import Auth from '../utils/auth'

import VideoPlayer from '../components/VideoPlayer'


function ClassPage() {
    let { id } = useParams();

    const { loading, data } = useQuery(QUERY_CLASS, {
        variables: { id: id }
    })

    const [joinClass, { error }] = useMutation(JOIN_CLASS)

    const handleSubscribe = async() => {

        try {
            const { data } = joinClass({
                variables: { classId: id }
            })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            {loading ? (
                <div>Loading Class Info...</div>
            ) : (
                <Grid stackable streched columns={2}>
                <Grid.Column mobile={16} tablet={13} computer={13}>
                    <VideoPlayer url={data.class.previewVideoUrl} />               
                </Grid.Column>
                <Grid.Column mobile={16} tablet={3} computer={3} floated='right'>
                    <Card fluid>
                        <Card.Content>
                            <Card.Header>{data.class.title}</Card.Header>
                            <Card.Description>Created By: {data.class.author.username}</Card.Description>
                            <Card.Description>{data.class.description}</Card.Description>
                        </Card.Content>
                        <Card.Content>
                            {Auth.loggedIn() ? (
                                <Button onClick={handleSubscribe}>Subscribe</Button>
                            ) : (
                                <Card.Header>You must be logged in to subscribe</Card.Header>
                            )}
                        </Card.Content>
                    </Card>
                </Grid.Column>
            </Grid>
            )}
        </>
    )
}

export default ClassPage;

