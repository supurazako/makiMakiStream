export type VideoDataModel = {
	platform: "twitch";
	channel: string;
} | {
	platform: "youtube";
	videoId: string;
}
