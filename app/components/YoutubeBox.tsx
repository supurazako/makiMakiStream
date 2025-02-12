import React, { useEffect, useRef } from 'react';

interface YoutubePlayerProps {
    videoId: string;
}

declare global {
    interface Window {
        YT: typeof YT;
        onYoutubeIframeAPIReady: () => void;
    }
}

const YoutubePlayer: React.FC<YoutubePlayerProps> = ({ videoId }) => {
    const playerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!window.YT) {
            const script = document.createElement('script');
            script.src = 'https://www.youtube.com/iframe_api';
            script.async = true;
            document.body.appendChild(script);

            window.onYoutubeIframeAPIReady = createPlayer;
        } else {
            createPlayer();
        }

        function createPlayer() {
            if (playerRef.current && window.YT) {
                new window.YT.Player(playerRef.current, {
                    videoId: videoId,
                    events: {
                        onReady: (event) => event.target.playVideo(),
                    },
                });
            }
        }
    }, [videoId]);

    return (
        <div ref={playerRef} />
    );
};

export default YoutubePlayer;
