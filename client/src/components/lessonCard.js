import React from 'react'

import { Card, Image, Rating } from 'semantic-ui-react'

const LessonCard = ({ lessonInfo }) => {

    console.log(lessonInfo)

    const classLink = `/class/${lessonInfo._id}`
    return (
        <Card href={classLink}>
            <Image fluid src={lessonInfo.previewImageUrl} />
            <Card.Content>
                <Card.Header>{lessonInfo.title}</Card.Header>
                <Card.Description>Author: {lessonInfo.author.username}</Card.Description>
                <Card.Description>{lessonInfo.description}</Card.Description>
            </Card.Content>
        </Card>
    )
}

export default LessonCard;