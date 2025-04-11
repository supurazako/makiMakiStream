import React, { useEffect, useRef } from 'react';

interface YoutubePlayerProps {
    videoId: string;
    onReady: (event: YT.PlayerEvent) => void;
}

declare global {
    interface Window {
        YT: typeof YT;
        onYouTubeIframeAPIReady: () => void;
    }
}

const YoutubePlayer: React.FC<YoutubePlayerProps> = ({ videoId, onReady }) => {
    const playerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!window.YT) {
            const script = document.createElement('script');
            script.src = 'https://www.youtube.com/iframe_api';
            script.async = true;
            document.body.appendChild(script);
            window.onYouTubeIframeAPIReady = createPlayer;
        } else {
            createPlayer();
        }

        function createPlayer() {
            if (playerRef.current && window.YT) {
                new window.YT.Player(playerRef.current, {
                    videoId: videoId,
                    events: {
                        onReady: (event) => {
                            event.target.playVideo();
                            onReady(event);
                        },
                    },
                });
            }
        }
    }, [onReady, videoId]);

    return (
        <div id='player' ref={playerRef} />
    );
};

export default YoutubePlayer;
