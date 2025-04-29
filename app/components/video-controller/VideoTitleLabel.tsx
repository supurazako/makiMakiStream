import { useAtomValue } from "jotai";
import { playerModelAtom } from "~/atoms";
import { VideoDataModel } from "~/models/videoDataModel";

export function VideoTitleLabel({ data }: { data: VideoDataModel }): JSX.Element {
	const player = useAtomValue(playerModelAtom(data));

	return <p className="video-title">{"placeholder"}</p>;
}
