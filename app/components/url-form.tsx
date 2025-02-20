import React, { useState } from 'react';

import TwitchStreamBox from './twitch-stream-box';
import { detectSite, getTwitchChannelName, getYoutubeVideoId } from '../utils/RegularExpression';
import YoutubePlayer from './YoutubeBox';

export default function UrlForm() {
    const [streamUrl, setStreamUrl] = useState<string | null>(null);
    const [site, setSite] = useState<string | null>(null);

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const data = new FormData(event.target as HTMLFormElement);
        // Check if the input text is a valid Twitch URL
        const inputText = data.get('inputText') as string;
        const site = detectSite(inputText);

        if (site == "twitch") {
            const channelName = getTwitchChannelName(inputText);
            console.log(`channelName: ${channelName}`);
            setStreamUrl(`https://player.twitch.tv/?channel=${channelName}`);
            setSite(site);
        }
        if (site == "youtube") {
            const videoId = getYoutubeVideoId(inputText);
            console.log(`videoId: ${videoId}`);
            setStreamUrl(videoId);
            setSite(site);
        }
        if (site == null) {
            alert('Invalid URL, plaese enter a valid URL');
        }
    }
    return (
        <>
            <form className='border-4 border-black' onSubmit={handleSubmit}>
                <input type="text" name="inputText" />
                <button type="submit">Submit</button>
            </form>
            {site === "twitch" && streamUrl && <TwitchStreamBox url={streamUrl} />}
            {site === "youtube" && streamUrl && <><YoutubePlayer videoId={streamUrl} /></>}
        </>
    )
}
