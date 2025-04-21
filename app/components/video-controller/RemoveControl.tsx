import { useSetAtom } from "jotai";
import { videoDataListAtom } from "~/atoms";
import { RemoveIcon } from "~/components/common/icons";
import { VideoDataModel } from "~/models/videoDataModel";

export function RemoveControl({ data }: { data: VideoDataModel }): JSX.Element {
	const setVideoDataList = useSetAtom(videoDataListAtom);

	function handleClick() {
		setVideoDataList((prev) => {
			return prev.filter((v) => v !== data);
		});
	}

	return (
		<button className="control-item"
			data-type="remove"
			type="button"
			onClick={handleClick}>
			<RemoveIcon />
		</button>
	);
}
