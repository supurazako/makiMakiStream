import { useAtomValue } from "jotai";
import { useEffect, useRef, useState } from "react";
import { resolverAtom } from "~/atoms";
import { VideoDataModel } from "~/models/videoDataModel";
import { YoutubePlayerModel } from "~/models/youtubePlayerModel";

export function YouTubeVideoEmbed({ data, elementId }: { data: VideoDataModel & { platform: "youtube" }, elementId: string }): JSX.Element {
	const resolve = useAtomValue(resolverAtom(data));
	const containerRef = useRef<HTMLDivElement | null>(null);
	const [player, setPlayer] = useState<YT.Player | null>(null);

	useEffect(() => {
		if (!window.YT) {
			const script = document.createElement('script');
			script.src = 'https://www.youtube.com/iframe_api';
			script.async = true;
			document.body.appendChild(script);
			window.onYouTubeIframeAPIReady = createPlayer;
		} else {
			createPlayer();
		}

		function createPlayer() {
			if (containerRef.current && window.YT) {
				new window.YT.Player(containerRef.current, {
					videoId: data.videoId,
					events: {
						onReady: (event) => {
							event.target.playVideo();
							resolve(new YoutubePlayerModel(event.target, data.meta.title, data.meta.channelName));
							setPlayer(event.target);
						},
					},
					width: "100%",
					height: "100%",
				});
			}
		}

		// TODO: クリーンアップがうまくできてなさそう！
		// TODO: YouTubePlayerにはリサイズメソッドがありそうなので、マウントごとにインスタンスを再生成するんじゃなくて、
		//       マウント時にインスタンスがすでに存在する場合はリサイズする...みたいにするとよさそう
	}, [data.meta.channelName, data.meta.title, data.videoId, resolve]);

	useEffect(() => {
		if (!player) return () => {};

		const observer = new ResizeObserver(entries => {
			entries.forEach(entry => {
				const { width, height } = entry.contentRect;
				const aspectRatio = 16 / 9;
				let newWidth = width;
				let newHeight = newWidth / aspectRatio;

				if (newHeight > height) {
					newHeight = height;
					newWidth = newHeight * aspectRatio;
				}

				player.setSize(newWidth, newHeight);
			});
		});

		if (containerRef.current?.parentElement) {
			observer.observe(containerRef.current!.parentElement!);
		}

		return () => {
			observer.disconnect();
		};
	}, [player]);

	return <div id={elementId} ref={containerRef} />
}
