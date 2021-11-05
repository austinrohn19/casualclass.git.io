import React from 'react';
import { Header, List } from 'semantic-ui-react';

import CreatedClassListItem from '../CreatedClassListItem/CreatedClassListItem';

import './CreatedClassList.scss';

function CreatedClassList({ createdClasses }) {
    return (
        <React.Fragment>
            <Header as="h3">Created Classes</Header>
            <List className="created-class-list">
                {createdClasses.map(createdClass => (
                    <CreatedClassListItem 
                        key={`${createdClass._id}`}
                        createdClass={createdClass}
                    />
                ))}
            </List>
        </React.Fragment>
    )
}

export default CreatedClassList;
