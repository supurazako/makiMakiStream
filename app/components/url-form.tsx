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
        if (/^(https:\/\/(www\.|m\.)?twitch\.tv\/|twitch\.tv\/)/.test(inputText)) {
            // Formatting sentences into embedding URL
            const formattedText = inputText.replace('https://www.twitch.tv/', 'https://player.twitch.tv/?channel=');
            // Add stream box
            setStreamUrl(formattedText);
        } else {
            alert('Invalid URL, plaese enter a valid Twitch URL');
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
