import React from 'react';
import { useParams } from 'react-router-dom';

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
                <div className="ClassPage">
                    <VideoPlayer url={data.class.previewVideoUrl} />
                    <h3>ID: {data.class._id}</h3>
                    <h3>Title: {data.class.title}</h3>
                </div>
            )}

        </>
    )
}

export default ClassPage;

