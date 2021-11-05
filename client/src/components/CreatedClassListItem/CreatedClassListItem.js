import React from 'react';
import { ListItem, Button } from 'semantic-ui-react'

import './CreatedClassListItem.scss';

function CreatedClassListItem({ createdClass }) {
    return (
        <ListItem className="created-class-list-item">
            <Button color="blue" as="a" href={`/class/${createdClass._id}`}>
                {createdClass.title}
            </Button>
        </ListItem>
    )
}

export default CreatedClassListItem;
