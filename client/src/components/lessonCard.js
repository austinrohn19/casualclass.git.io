import React from 'react'

import { Card } from 'semantic-ui-react'

const LessonCard = ({ lessonInfo }) => {

    return (
        <Card fluid>
            <Card.Content>
                <Card.Header>{lessonInfo.title}</Card.Header>
                <Card.Meta>{lessonInfo.author}</Card.Meta>
                <Card.Description>{lessonInfo.description}</Card.Description>
            </Card.Content>
        </Card>
    )
}

export default LessonCard;