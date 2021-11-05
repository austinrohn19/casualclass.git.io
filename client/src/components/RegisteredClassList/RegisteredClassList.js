import React from 'react';
import { List } from 'semantic-ui-react';

import './RegisteredClassList.scss';

function RegisteredClassList({ joinedClasses }) {
    console.log(joinedClasses);
    return (
        <List className="registered-class-list">
            {joinedClasses.map(joinedClass => (
                <li key={`${joinedClass._id}`}>{joinedClass.title}</li>
            ))}
        </List>
    )
}

export default RegisteredClassList;
