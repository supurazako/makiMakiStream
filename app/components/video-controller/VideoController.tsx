import { Suspense } from "react";
import { ControlItemSkeleton } from "~/components/ControlItemSkeleton";
import { PlayControl } from "~/components/video-controller/PlayControl";
import { RemoveControl } from "~/components/video-controller/RemoveControl";
import { VolumeControl } from "~/components/video-controller/VolumeControl";
import { VideoDataModel } from "~/models/videoDataModel";

import "~/styles/video-controller.css";

export function VideoController({ data }: { data: VideoDataModel }): JSX.Element {
	return (
		<div className="video-controller">
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

				<RemoveControl data={data} />
			</div>
		</div>
	);
}
