import { useSetAtom } from "jotai";
import { Suspense, useState } from "react";
import { videoDataListAtom } from "~/atoms";
import { ControlItemSkeleton } from "~/components/ControlItemSkeleton";
import { PlayControl } from "~/components/video-controller/PlayControl";
import { RemoveControl } from "~/components/video-controller/RemoveControl";
import { VolumeControl } from "~/components/video-controller/VolumeControl";
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
			onAnimationEnd={() => {
				if (isDisappearing) {
					setVideoDataList((prev) => {
						return prev.filter((v) => v !== data);
					});
				}
			}}>

			<div className="labels">
				<div className="icon" />
				<div className="url" />
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
