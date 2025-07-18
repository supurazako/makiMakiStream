import { useAtomValue } from "jotai";
import { JSX, useEffect, useState } from "react";
import { muteStateAtom, playerModelAtom, volumeStateAtom } from "~/atoms";
import { MuteIcon, VolumeLevel1Icon, VolumeLevel2Icon } from "~/components/common/icons";
import { VideoDataModel } from "~/models/videoDataModel";

const LOW_VOLUME_THRESHOLD = 0.5;

export function VolumeControl({ data }: { data: VideoDataModel }): JSX.Element {
	const player = useAtomValue(playerModelAtom(data));
	const [isMuted, setMuted] = useState(player.isMuted());
	const actualMuted = useAtomValue(muteStateAtom(player));
	const [volume, setVolume] = useState(player.getVolume());
	const actualVolume = useAtomValue(volumeStateAtom(player));

	useEffect(() => {
		setMuted(actualMuted);
	}, [actualMuted]);

	useEffect(() => {
		setVolume(actualVolume);
	}, [actualVolume]);

	function toggleMuted() {
		player.toggleMuted();
		setMuted(!isMuted);
	}

	function handleSlide(e: React.ChangeEvent<HTMLInputElement>) {
		const value = Number(e.target.value);

		if (value === 0) {
			player.mute();
			setMuted(true);
		} else {
			player.unmute();
			setMuted(false);
			player.setVolume(value);
			setVolume(value);
		}
	}

	return (
		<div className="volume-control-container">
			<button className="control-item"
				data-type="mute"
				data-state={isMuted ? "muted" : "unmuted"}
				type="button"
				onClick={toggleMuted}>
				{
					isMuted ? <MuteIcon /> : (volume <= 0.5 ? <VolumeLevel1Icon /> : <VolumeLevel2Icon />)
				}
			</button>

			<input className="volume-slider"
				type="range"
				max={1.0}
				min={0.0}
				step={0.01}
				value={isMuted ? 0 : volume}
				onChange={handleSlide}
				style={{
					"--ratio": `${isMuted ? 0 : volume}`
				} as React.CSSProperties}>
			</input>
		</div>
	);
}
