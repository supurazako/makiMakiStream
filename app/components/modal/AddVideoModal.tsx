import { useSetAtom } from "jotai";
import { FormEvent, useState } from "react";
import { modalContentAtom, videoDataListAtom } from "~/atoms";
import { VideoDataModel } from "~/models/videoDataModel";
import { detectSite, getTwitchChannelName, getYoutubeVideoId } from "~/utils/RegularExpression";

export function AddVideoModal(): JSX.Element {
	const [platform, setPlatform] = useState<string>("");
	const [videoTarget, setVideoTarget] = useState<string>("");
	const setVideoDataList = useSetAtom(videoDataListAtom);

	const dispatchModalContent = useSetAtom(modalContentAtom);

	function handleSubmit(event: FormEvent<HTMLFormElement>): void {
		event.preventDefault();

		let data: VideoDataModel;
		switch (platform) {
			case "twitch": {
				data = { platform: "twitch", channel: videoTarget };
				break;
			}
			case "youtube": {
				data = { platform: "youtube", videoId: videoTarget };
				break;
			}
			default: {
				const detectedPlatform = detectSite(videoTarget);
				switch (detectedPlatform) {
					case "youtube": {
						const videoId = getYoutubeVideoId(videoTarget);
						if (!videoId) {
							return;
						}
						data = { platform: "youtube", videoId: videoId };
						break;
					}
					case "twitch": {
						const channel = getTwitchChannelName(videoTarget);
						if (!channel) {
							return;
						}
						data = { platform: "twitch", channel: channel };
						break;
					}
					default: {
						alert("Unsupported platform or invalid URL.");
						return;
					}
				}
			}
		}

		setVideoDataList((prev) => [...prev, data]);

		dispatchModalContent({ type: "close" });

	}

	function handleClose(): void {
		setPlatform("");
		setVideoTarget("");
		dispatchModalContent({ type: "close" });
	}

	return (
		<form onSubmit={handleSubmit}>
			<label>
				{"プラットフォーム:"}
				<select value={platform} onChange={(e) => setPlatform(e.target.value)}>
					<option value="" hidden disabled>{"Select Platform (Optional)"}</option>
					<option value="twitch">Twitch</option>
					<option value="youtube">YouTube</option>
				</select>
			</label>
			<label>
				{"URLや動画のID、チャンネルIDなど:"}
				<input type="text" name="videoTarget" value={videoTarget} onChange={e => setVideoTarget(e.target.value)} />
			</label>
			<button type="button" onClick={handleClose}>Close</button>
			<button type="submit">Submit</button>
		</form>
	);
}
