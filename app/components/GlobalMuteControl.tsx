import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import { allMuteStateAtom } from "~/atoms";
import { PlayerModel } from "~/models/playerModel";
import { MuteIcon, VolumeIcon } from "./common/icons";

export function GlobalMuteControl({ players }: { players: PlayerModel[] }): JSX.Element {
	const [isMuted, setMuted] = useState(players.every(v => v.isMuted()));
	const muteState = useAtomValue(allMuteStateAtom);
	const actualMuted = muteState.every(v => v);

	useEffect(() => {
		setMuted(actualMuted);
	}, [actualMuted]);

	function toggleMuted() {
		actualMuted
			? players.forEach(player => player.unmute())
			: players.forEach(player => player.mute());
		setMuted((prev) => !prev);
	}

	return (
		<button className="control-item"
			data-type="mute"
			data-state={isMuted ? "muted" : "unmuted"}
			type="button"
			onClick={toggleMuted}>
			{
				isMuted ? <MuteIcon /> : <VolumeIcon />
			}
		</button>
	);
}
