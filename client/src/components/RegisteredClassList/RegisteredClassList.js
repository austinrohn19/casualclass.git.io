import React from 'react';
import { Header, List } from 'semantic-ui-react';

import RegisteredClassListItem from '../RegisteredClassListItem/RegisteredClassListItem';

import './RegisteredClassList.scss';

function RegisteredClassList({ joinedClasses }) {
    return (
        <React.Fragment>
            <Header as="h3">Joined Classes</Header>
            <List className="registered-class-list">
                {joinedClasses.map(joinedClass => (
                    <RegisteredClassListItem 
                        key={`${joinedClass._id}`}
                        joinedClass={joinedClass}
                    />
                ))}
            </List>
        </React.Fragment>
    )
}

export default RegisteredClassList;
