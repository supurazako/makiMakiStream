export const detectSite = (url: string): "youtube" | "twitch" | null => {
    if (/youtube\.com|youtu\.be/.test(url)) return "youtube";
    if (/twitch\.tv/.test(url)) return "twitch";
    return null;
}

export const getYoutubeVideoId = (url: string): string | null => {
    // TODO: Support "youtube.com/live/XXXX" URLs
    const regExp = /(?:youtube\.com\/(?:[^/]+\/.*|(?:v|e(?:mbed)?)\/|.*[?&]v=))([^"&?/\s]{11})(?:[?&]|$)/;
    const match = url.match(regExp);
    return match ? match[1] : null;
}

export const getTwitchChannelName = (url: string): string | null => {
    const regExp = /(?:twitch\.tv\/)([a-zA-Z0-9_]+)/;
    const match = url.match(regExp);
    return match ? match[1] : null;
}
