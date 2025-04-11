import { useAtomValue } from "jotai";
import { useEffect } from "react";
import { resolverAtom } from "~/atoms";
import { TwitchPlayerModel } from "~/models/twitchPlayerModel";
import { VideoDataModel } from "~/models/videoDataModel";

export function TwitchStreamContainer({ data, elementId }: { data: VideoDataModel & { platform: "twitch" }, elementId: string }): JSX.Element {
	const resolve = useAtomValue(resolverAtom(data));

	useEffect(() => {
		const script = document.createElement("script");
		script.src = "https://player.twitch.tv/js/embed/v1.js";
		script.async = true;
		document.body.appendChild(script);

		script.onload = () => {
			const options = {
				channel: data.channel,
			};
			// インスタンス生成時にiframeが生成される。
			const player = new Twitch.Player(elementId, options);
			player.addEventListener(Twitch.Player.READY, () => {
				resolve(new TwitchPlayerModel(player));
			});
		};

		return () => {
			// メモ：onloadが走る前にアンマウントされた場合、ココよりあとにiframeが生成されるため、onloadを削除することで対応します。
			script.onload = null;
			// メモ：onloadが走ったあとにアンマウントされた場合は、すでにiframeが生成されているため、iframeを削除します。
			document.getElementById(elementId)?.getElementsByTagName("iframe")[0]?.remove();
			script.remove();
		};
	}, [data.channel, elementId, resolve]);

	return (
		<div id={elementId} />
	);
}
