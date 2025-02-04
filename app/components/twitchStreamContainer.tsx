import { useEffect } from "react";

export function TwitchStreamContainer(): JSX.Element {
	useEffect(() => {
		const options = {
			channel: "uge_and",
		};
		const player = new Twitch.Player("player", options);
		player.setVolume(0.5);
	}, []);

	return (
		<div>
			<script src="https://player.twitch.tv/js/embed/v1.js"></script>
			<div id="player"></div>
		</div>
	);
}
