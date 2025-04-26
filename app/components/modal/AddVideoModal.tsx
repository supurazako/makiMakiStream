import { useSetAtom } from "jotai";
import { FormEvent, useState } from "react";
import { modalContentAtom, videoDataListAtom } from "~/atoms";
import { VideoDataModel } from "~/models/videoDataModel";
import { detectSite, getTwitchChannelName, getYoutubeVideoId } from "~/utils/RegularExpression";

import "~/styles/modal/add-video-modal.css";
import { ArrowDownIcon } from "../common/icons";

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
				data = { platform: "twitch", channel: videoTarget, id: crypto.randomUUID() };
				break;
			}
			case "youtube": {
				data = { platform: "youtube", videoId: videoTarget, id: crypto.randomUUID() };
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
						data = { platform: "youtube", videoId: videoId, id: crypto.randomUUID() };
						break;
					}
					case "twitch": {
						const channel = getTwitchChannelName(videoTarget);
						if (!channel) {
							return;
						}
						data = { platform: "twitch", channel: channel, id: crypto.randomUUID() };
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
		<div className="add-video-modal">
			<p className="modal-description">
				{/* TODO: 説明これでいい？ */}
				{"https://www.twitch.tv/xxxx のようなURLの場合、プラットフォームを選択する必要はありません。"}
				<br />
				{"xxxxのように、アカウントIDや動画のIDを直接入力する場合は、プラットフォームを選択してください。"}
			</p>
			<hr className="modal-separator" />
			<form id="add-video" onSubmit={handleSubmit}>
				<label>
					{"プラットフォーム:"}
					<select value={platform} onChange={(e) => setPlatform(e.target.value)}>
						<button>
							<div className="selected-content">
								<selectedcontent />
							</div>
							<div className="picker-icon">
								<ArrowDownIcon />
							</div>
						</button>
						<option value="" hidden disabled>{"Select Platform (Optional)"}</option>
						<option value="twitch">Twitch</option>
						<option value="youtube">YouTube</option>
					</select>
				</label>
				<label>
					{"URLや動画のID、チャンネルIDなど:"}
					<input type="text" name="videoTarget" value={videoTarget} onChange={e => setVideoTarget(e.target.value)} />
				</label>
			</form>
			<div className="modal-bottom">
				<button className="modal-confirm-button" type="submit" form="add-video">OK</button>
				<button className="modal-cancel-button" type="button" onClick={handleClose}>キャンセル</button>
			</div>
		</div>
	);
}
