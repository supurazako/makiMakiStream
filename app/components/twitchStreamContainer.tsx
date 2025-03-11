import { useEffect } from "react";

export function TwitchStreamContainer({ channel, onLoad }: { channel: string, onLoad: (player: Twitch.Player) => void }): JSX.Element {
	useEffect(() => {
		const script = document.createElement("script");
		script.src = "https://player.twitch.tv/js/embed/v1.js";
		script.async = true;
		document.body.appendChild(script);

		script.onload = () => {
			const options = {
				channel: channel,
			};
			// インスタンス生成時にiframeが生成される。
			const player = new Twitch.Player("player", options);

			onLoad(player);
		};

		return () => {
			// メモ：onloadが走る前にアンマウントされた場合、ココよりあとにiframeが生成されるため、onloadを削除することで対応します。
			script.onload = null;
			// メモ：onloadが走ったあとにアンマウントされた場合は、すでにiframeが生成されているため、iframeを削除します。
			document.getElementById("player")?.getElementsByTagName("iframe")[0]?.remove();
			script.remove();
		};
	}, [channel, onLoad]);

	return (
		<div id="player" />
	);
}
