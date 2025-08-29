import { google } from "googleapis";
import { VideoDataModel } from "~/models/videoDataModel";

export async function parseVideoDataFromUrl(url: URL, apiKeys: {
	GOOGLE_API_KEY: string
}): Promise<VideoDataModel[]> {
	const videosParam = url.searchParams.get("videos");
	if (!videosParam) {
		return [];
	}

	const videoIds = videosParam.split(",");
	const videoDataList: VideoDataModel[] = [];

	const youtubeVideoIds = videoIds.filter(id => id.startsWith("yt:")).map(id => id.substring(3));
	const twitchChannelIds = videoIds.filter(id => id.startsWith("tw:")).map(id => id.substring(3));

	if (youtubeVideoIds.length > 0) {
		const youtube = google.youtube({
			version: "v3",
			auth: apiKeys.GOOGLE_API_KEY
		});
		const response = await youtube.videos.list({
			part: ["snippet"],
			id: youtubeVideoIds,
		});
		if (response.data.items) {
			for (const item of response.data.items) {
				videoDataList.push({
					id: `yt:${item.id}`,
					platform: "youtube",
					videoId: item.id ?? "",
					meta: {
						title: item.snippet?.title ?? "",
						channelName: item.snippet?.channelTitle ?? "",
					},
				});
			}
		}
	}

	if (twitchChannelIds.length > 0) {
		for (const channelId of twitchChannelIds) {
			videoDataList.push({
				id: `tw:${channelId}`,
				platform: "twitch",
				channel: channelId,
			});
		}
	}

	return videoDataList;
}


