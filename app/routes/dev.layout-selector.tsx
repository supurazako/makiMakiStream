import { useAtom } from "jotai";
import { videoDataListAtom } from "~/atoms";
import { LayoutSelector } from "~/components/layout-selector/LayoutSelector";
import { TwitchStreamContainer } from "~/components/twitchStreamContainer";
import { VideoControllersContainer } from "~/components/video-controller/VideoControllersContainer";

import "~/common/common.css";

export default function Index(): JSX.Element {
	const [videoDataList, setVideoDataList] = useAtom(videoDataListAtom);

	return (
		<div className="sidebar_placeholder" style={{
			width: "450px",
			height: "100%",
			padding: "30px",
			border: "1px solid black",
			background: "#F5F5F5"
		}}>
			<LayoutSelector />
			<VideoControllersContainer />

			{
				videoDataList.map((v, i) => {
					switch (v.platform) {
						case "twitch":
							return <TwitchStreamContainer data={v} elementId={`player_${i}`} key={i} />;
						default:
							throw new Error("Unsupported platform: " + v.platform);
					}
				})
			}
			<button onClick={() => setVideoDataList(l => l.concat({ platform: "twitch", channel: "akamikarubi" }))}>{"[test] Add twitch video"}</button>
		</div>
	);
}
