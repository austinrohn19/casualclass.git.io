import React from 'react';
import { useParams } from 'react-router-dom';
import { Grid, Card } from 'semantic-ui-react'

import { useQuery } from '@apollo/client';
import { QUERY_CLASS } from '../utils/queries';

import VideoPlayer from '../components/VideoPlayer'


function ClassPage() {
    let { id } = useParams();

    const { loading, data } = useQuery(QUERY_CLASS, {
        variables: { id: id }
    })

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
                    </Card>
                </Grid.Column>
            </Grid>
            )}

        </>
    )
}

export default ClassPage;

