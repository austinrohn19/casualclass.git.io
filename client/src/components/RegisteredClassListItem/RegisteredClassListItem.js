import React from 'react';
import { ListItem, Button } from 'semantic-ui-react'

import './RegisteredClassListItem.scss';

function RegisteredClassListItem({ joinedClass }) {
    return (
        <ListItem className="registered-class-list-item">
            <Button color="blue" as="a" href={`/class/${joinedClass._id}`}>
                {joinedClass.title}
            </Button>
            hosted by {joinedClass.author.username}
        </ListItem>
    )
}

export default RegisteredClassListItem;
