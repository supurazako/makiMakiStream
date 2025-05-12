import { LinksFunction } from "@remix-run/node";
import { useAtom } from "jotai";
import { videoDataListAtom } from "~/atoms";
import { Modal } from "~/components/common/Modal";
import { TwitchStreamContainer } from "~/components/twitchStreamContainer";
import { VideoControllersContainer } from "~/components/video_controllers";
import YoutubePlayer from "~/components/YoutubeBox";

export const links: LinksFunction = () => {
    return [
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
        { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100..900&display=swap" },
        { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c&display=swap" },
        { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=BIZ+UDPGothic&display=swap" }
    ];
}

export default function App(): JSX.Element {
    const [videoDataList, setVideoDataList] = useAtom(videoDataListAtom);

    return (
        <div className="sidebar_placeholder" style={{
            width: "450px",
            height: "100%",
            padding: "30px",
            border: "1px solid black",
            background: "#F5F5F5"
        }}>
            <Modal />
            <VideoControllersContainer />

            {
                videoDataList.map((v, i) => {
                    switch (v.platform) {
                        case "twitch": {
                            return <TwitchStreamContainer data={v} elementId={`player_${i}`} key={i} />;
                        } case "youtube": {
                            return <YoutubePlayer data={v} key={i} />;
                        } default: {
                            return <div key={i}>{"Unsupported platform🥺"}</div>;
                        }
                    }
                })
            }
            <button onClick={() => setVideoDataList(l => l.concat({ platform: "twitch", channel: "akamikarubi" }))}>{"[test] Add twitch video"}</button>
            <br />
            <button onClick={() => setVideoDataList(l => l.concat({ platform: "youtube", videoId: "KLBZ5s8w6lw" }))}>{"[test] Add youtube video"}</button>
        </div>
    );
}
