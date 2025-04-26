import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import { playerModelAtom, playStateAtom } from "~/atoms";
import { PauseIcon, PlayIcon } from "~/components/common/icons";
import { VideoDataModel } from "~/models/videoDataModel";

export function PlayControl({ data }: { data: VideoDataModel }): JSX.Element {
	const player = useAtomValue(playerModelAtom(data));
	const [isPlaying, setPlaying] = useState(player.isPlaying());
	const actualPlaying = useAtomValue(playStateAtom(player));

	useEffect(() => {
		setPlaying(actualPlaying);
	}, [actualPlaying]);

	function togglePlaying() {
		player.togglePlaying();
		setPlaying(!isPlaying);
	}

	return (
		<button className="control-item"
			data-type="play"
			data-state={isPlaying ? "playing" : "paused"}
			type="button"
			onClick={togglePlaying}>
			{
				isPlaying ? <PauseIcon /> : <PlayIcon />
			}
		</button>
	);
}
