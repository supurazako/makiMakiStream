import { VideoDataModel } from "~/models/videoDataModel";

export function generateUrlFromVideoData(videoDataList: VideoDataModel[]): string {
	const videoIds: string[] = [];
	for (const videoData of videoDataList) {
		if (videoData.platform === "youtube") {
			videoIds.push(`yt:${videoData.videoId}`);
		} else if (videoData.platform === "twitch") {
			videoIds.push(`tw:${videoData.channel}`);
		}
	}
	const params = new URLSearchParams();
	if (videoIds.length > 0) {
		params.set("videos", videoIds.join(","));
	}
	return `${window.location.origin}${window.location.pathname}?${params.toString()}`;
}