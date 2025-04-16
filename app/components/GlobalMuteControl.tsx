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
		<div className="control_item volume_control">
			<button className="control_button volume_button"
				type="button"
				onClick={toggleMuted} 
				style={{width: "50px", height: "50px",}}>
				{
					isMuted ? <MuteIcon /> : <VolumeIcon />
				}
			</button>
		</div>
	);
}
