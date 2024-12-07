import React, { useState } from 'react';
import TwitchStreamBox from './twitch-stream-box';

export default function UrlForm() {
    const [streamUrl, setStreamUrl] = useState<string | null>(null);

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const data = new FormData(event.target as HTMLFormElement);
        // TODO: Add stream box
        // Check if the input text is a valid Twitch URL
        const inputText = data.get('inputText') as string;
        const match = inputText.match(/^(?:https:\/\/)?(?:www\.)?twitch\.tv\/([a-zA-Z0-9_]+)/);
        if (match) {
            const channelName = match[1];
            console.log(`channelName: ${channelName}`);
            // Formatting sentences into embedding URL
            setStreamUrl(`https://player.twitch.tv/?channel=${channelName}`);
        } else {
            alert('Invalid URL, plaese enter a valid URL');
        }
    }
    return (
        <>
            <form className='border-4 border-black' onSubmit={handleSubmit}>
                <input type="text" name="inputText" />
                {/* TODO: submitをonClickイベントにする */}
                <button type="submit">Submit</button>
            </form>
            {streamUrl && <TwitchStreamBox url={streamUrl} />}
        </>
    )
}
