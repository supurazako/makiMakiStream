import { useSetAtom } from "jotai";
import { JSX, Suspense, useState } from "react";
import { videoDataListAtom } from "~/atoms";
import { ControlItemSkeleton } from "~/components/controller/ControlItemSkeleton";
import { PlayControl } from "~/components/controller/PlayControl";
import { RemoveControl } from "~/components/controller/RemoveControl";
import { ChannelNameLabel } from "~/components/controller/video-controller/ChannelNameLabel";
import { VideoTitleLabel } from "~/components/controller/video-controller/VideoTitleLabel";
import { VolumeControl } from "~/components/controller/VolumeControl";
import { VideoDataModel } from "~/models/videoDataModel";

import "~/styles/video-controller.css";

export function VideoController({ data }: { data: VideoDataModel }): JSX.Element {
	const setVideoDataList = useSetAtom(videoDataListAtom)
	const [isDisappearing, setDisappearing] = useState(false);

	function handleRemove() {
		setDisappearing(true);
	}

	return (
		<div className={`video-controller${isDisappearing ? " disappearing" : ""}`}
			data-platform={data.platform}
			onAnimationEnd={() => {
				if (isDisappearing) {
					setVideoDataList((prev) => {
						return prev.filter((v) => v !== data);
					});
				}
			}}>

			<div className="labels">
				<Suspense fallback={<div className="video-title-skeleton" />}>
					<VideoTitleLabel data={data} />
				</Suspense>

				<Suspense fallback={<div className="channel-name-skeleton" />}>
					<ChannelNameLabel data={data} />
				</Suspense>
			</div>

			<div className="controls">
				<Suspense fallback={<ControlItemSkeleton />}>
					<PlayControl data={data} />
				</Suspense>

				<Suspense fallback={<ControlItemSkeleton />}>
					<VolumeControl data={data} />
				</Suspense>

				<RemoveControl handleRemove={handleRemove} />
			</div>
		</div>
	);
}
