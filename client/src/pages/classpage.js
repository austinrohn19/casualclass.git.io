import React from 'react';
import { useParams } from 'react-router-dom';

import { useQuery } from '@apollo/client';
import { QUERY_CLASS } from '../utils/queries';


function ClassPage() {
    let { id } = useParams();

    const { loading, data } = useQuery(QUERY_CLASS, {
        variables: { id: id }
    })

    return (
        <>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div className="ClassPage">
                    <h3>ID: {data.class._id}</h3>
                    <h3>Title: {data.class.title}</h3>

                </div>
            )}

        </>
    )
}

export default ClassPage;

