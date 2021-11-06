import React from 'react'
import { Container } from 'semantic-ui-react'

import ResponsiveEmbed from 'react-responsive-embed'



const VideoPlayer = ({ url }) => {

    return (
        <ResponsiveEmbed src={url} />
    )
}

export default VideoPlayer;