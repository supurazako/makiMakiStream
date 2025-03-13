import React from 'react';
import YoutubePlayer from '~/components/YoutubeBox';

const ParentComponent: React.FC = () => {
    const videoId = 'dQw4w9WgXcQ';

    return (
        <div>
            <YoutubePlayer videoId={videoId} />
        </div>
    );
};

export default ParentComponent;
