import { useAtomValue } from "jotai";
import { selectedLayoutTypeAtom, videoDataListAtom } from "~/atoms";
import { TwitchStreamContainer } from "~/components/twitchStreamContainer";
import YoutubePlayer from "~/components/YoutubeBox";

import "~/styles/videos-container.css";

export function VideosContainer(): JSX.Element {
	const videoDataList = useAtomValue(videoDataListAtom);
	const layoutType = useAtomValue(selectedLayoutTypeAtom);

	return (
		<section className="videos-container"
			data-layout={`${videoDataList.length}${layoutType}`}>
			{
				videoDataList.map((v, i) => {
					let videoElement = null;

					switch (v.platform) {
						case "twitch":
							videoElement = <TwitchStreamContainer data={v} elementId={`player_${i}`} />
							break;
						case "youtube":
							videoElement = <YoutubePlayer data={v} />
							break;
						default:
							throw new Error("Unsupported platform 🥲");
					}

					return (
						<section className="video-container" key={v.id}>
							{videoElement}
						</section>
					);
				})
			}
		</section>
	);
}
