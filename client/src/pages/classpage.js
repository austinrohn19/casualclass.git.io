
import React from 'react';
import { Redirect } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Loader, Header, Label, Divider, Button } from 'semantic-ui-react';
import { useParams } from 'react-router-dom'; 

import { QUERRY_CLASS } from '../utils/queries';


function ClassPage(lessonInfo) {
    const { loading, error, data } = useQuery(QUERRY_CLASS{_id});
    console.log(data)

    let { id } = useParams();


    return (
        <div className="ClassPage">
            <h3>ID: {id}</h3>
        </div>
    )
}

export default ClassPage;

