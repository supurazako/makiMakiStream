import { useAtomValue } from "jotai";
import { JSX } from "react";
import { videoDataListAtom } from "~/atoms";
import { AddVideoButton } from "~/components/controller/video-controller/AddVideoButton";
import { VideoController } from "~/components/controller/video-controller/VideoController";

import "~/styles/video-controllers-container.css";

export function VideoControllersContainer(): JSX.Element {
	const videoDataList = useAtomValue(videoDataListAtom);

	return (
		<div className="video-controllers-container">
			{
				videoDataList.map(v => <VideoController key={v.id} data={v} />)
			}
			<AddVideoButton />
		</div>
	);
}
