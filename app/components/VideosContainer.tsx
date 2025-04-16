import { useAtomValue } from "jotai";
import { videoDataListAtom } from "~/atoms";
import { TwitchStreamContainer } from "./twitchStreamContainer";

import "~/styles/videos-container.css";

export function VideosContainer(): JSX.Element {
	const videoDataList = useAtomValue(videoDataListAtom);

	return (
		<section className="videos-container">
			{
				videoDataList.map((v, i) => {
					switch (v.platform) {
						case "twitch":
							return (
								<section className="video-container" key={i}>
									<TwitchStreamContainer data={v} elementId={`player_${i}`} />
								</section>
							);
						default:
							throw new Error("Unsupported platform: " + v.platform);
					}
				})
			}
		</section>
	)
}
