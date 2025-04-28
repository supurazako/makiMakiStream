import { useAtomValue } from "jotai";
import { useEffect, useRef } from "react";
import { resolverAtom, videoPromiseAtom } from "~/atoms";
import { TwitchPlayerModel } from "~/models/twitchPlayerModel";
import { VideoDataModel } from "~/models/videoDataModel";

export function TwitchStreamContainer({ data, elementId }: { data: VideoDataModel & { platform: "twitch" }, elementId: string }): JSX.Element {
	const resolve = useAtomValue(resolverAtom(data));
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const script = document.createElement("script");
		script.src = "https://player.twitch.tv/js/embed/v1.js";
		script.async = true;
		document.body.appendChild(script);

		const parent = containerRef.current?.parentElement;
		const parentW = parent?.clientWidth || 0;
		const parentH = parent?.clientHeight || 0;
		const aspectRatio = 16 / 9;
		let width = parentW;
		let height = width / aspectRatio;

		if (height > parentH) {
			height = parentH;
			width = height * aspectRatio;
		}

		script.onload = () => {
			const options = {
				channel: data.channel,
				width: width,
				height: height,
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
			// Promiseをリセットし、次回マウント時に新しいインスタンスを生成するようにします。これは、Twitch.Playerの生成後にリサイズすることができないためです。
			videoPromiseAtom.remove(data);
		};
	}, [data, data.channel, elementId, resolve]);

	return (
		<div id={elementId} ref={containerRef} />
	);
}
