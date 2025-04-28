import { useAtomValue } from 'jotai';
import React, { useEffect, useRef } from 'react';
import { resolverAtom } from '~/atoms';
import { VideoDataModel } from '~/models/videoDataModel';
import { YoutubePlayerModel } from '~/models/youtubePlayerModel';

interface YoutubePlayerProps {
    data: VideoDataModel & { platform: 'youtube' };
}

declare global {
    interface Window {
        YT: typeof YT;
        onYouTubeIframeAPIReady: () => void;
    }
}

// TODO: 関数型コンポーネントに書き換えよう
const YoutubePlayer: React.FC<YoutubePlayerProps> = ({ data }) => {
    const resolve = useAtomValue(resolverAtom(data));
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
                    videoId: data.videoId,
                    events: {
                        onReady: (event) => {
                            event.target.playVideo();
                            resolve(new YoutubePlayerModel(event.target));
                        },
                    },
                });
            }
        }

        // TODO: クリーンアップがうまくできてなさそう！
        // TODO: YouTubePlayerにはリサイズメソッドがありそうなので、マウントごとにインスタンスを再生成するんじゃなくて、
        //       マウント時にインスタンスがすでに存在する場合はリサイズする...みたいにするとよさそう
    }, [data.videoId, resolve]);

    return (
        <div id='player' ref={playerRef} />
    );
};

export default YoutubePlayer;
