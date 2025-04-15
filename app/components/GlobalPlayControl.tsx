import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import { allPlayStateAtom } from "~/atoms";
import { PlayerModel } from "~/models/playerModel";
import { PauseIcon, PlayIcon } from "./common/icons";

export function GlobalPlayControl({ players }: { players: PlayerModel[] }): JSX.Element {
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
		<div className="control_item play_control">
			<button
				className={"control_button play_button" + (isPlaying ? " is_playng" : "")}
				type="button"
				onClick={togglePlaying}>
				{isPlaying ? <PauseIcon /> : <PlayIcon />}
			</button>
		</div>
	);
}
