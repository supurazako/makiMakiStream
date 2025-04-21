import { useAtomValue } from "jotai";
import { videoDataListAtom } from "~/atoms";
import { VideoController } from "~/components/video-controller/VideoController";
import { AddVideoButton } from "../video_controllers";

export function VideoControllersContainer(): JSX.Element {
	const videoDataList = useAtomValue(videoDataListAtom);

	return (
		<div className="video-controllers-container">
			{
				videoDataList.map((v, i) => <VideoController key={i} data={v} />)
			}
			<AddVideoButton />
		</div>
	);
}
