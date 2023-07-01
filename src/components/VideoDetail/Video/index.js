import React from 'react';
import { useState, memo } from 'react';

function Video({ data }) {
    const [isPlaying, setIsPlaying] = useState(true);

    const handleVideoClick = () => {
        setIsPlaying(!isPlaying);
    };

    return (
        <video
            controls
            src={data.file_url}
            muted
            disablePictureInPicture
            poster={data.thumb_url || ''}
            loop
            autoPlay={isPlaying}
            playsInline
            onClick={handleVideoClick}
        />
    );
}

export default memo(Video);
