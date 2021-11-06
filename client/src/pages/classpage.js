import React from 'react';
import { Redirect } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Loader, Header, Label, Divider, Button } from 'semantic-ui-react';

import { QUERY_ME } from '../utils/queries';

function ClassPage(lessonInfo) {
    const { loading, error, data } = useQuery(QUERY_ME);
    console.log(data)

   
    return (
        <div className="ClassPage">
            
        </div>
    )
}

export default ClassPage;