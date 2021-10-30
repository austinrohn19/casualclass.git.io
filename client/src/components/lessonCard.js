import React from 'react'

import { Card, Image } from 'semantic-ui-react'

const LessonCard = ({ lessonInfo }) => {

    return (
        <Card>
            <Card.Content>
                <Image  src='https://via.placeholder.com/300.png/09f/fff' />
                <Card.Header>{lessonInfo.title}</Card.Header>
                <Card.Meta>{lessonInfo.author}</Card.Meta>
                <Card.Description>{lessonInfo.description}</Card.Description>
            </Card.Content>
        </Card>
    )
}

export default LessonCard;