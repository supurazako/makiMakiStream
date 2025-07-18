import { useAtomValue } from "jotai";
import { JSX, useEffect, useState } from "react";
import { allPlayerModelsAtom, allPlayStateAtom } from "~/atoms";
import { PauseIcon, PlayIcon } from "~/components/common/icons";

export function GlobalPlayControl(): JSX.Element {
	const players = useAtomValue(allPlayerModelsAtom);
	// optimisticな処理。他のボタンやビデオコントローラでも同様の仕組みで実装しています
	const [isPlaying, setPlaying] = useState(players.every(v => v.isPlaying()));
	const playStates = useAtomValue(allPlayStateAtom);
	const actualPlaying = playStates.every(v => v);

	useEffect(() => {
		setPlaying(actualPlaying);
	}, [actualPlaying]);

	function togglePlaying() {
		actualPlaying
			? players.forEach(player => player.pause())
			: players.forEach(player => player.play());
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
