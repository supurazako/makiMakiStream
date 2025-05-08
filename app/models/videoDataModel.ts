export type VideoDataModel = ({
	platform: "twitch";
	channel: string;
} | {
	platform: "youtube";
	videoId: string;
	meta: {
		title: string;
		channelName: string;
	}
}) & {
	id: string;
}
