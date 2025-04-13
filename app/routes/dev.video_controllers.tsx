import { useAtom } from "jotai";
import { createContext, useState } from "react";
import { videoDataListAtom } from "~/atoms";
import { AddVideoModal } from "~/components/common/modal";
import { TwitchStreamContainer } from "~/components/twitchStreamContainer";
import { VideoControllersContainer } from "~/components/video_controllers";
import YoutubePlayer from "~/components/YoutubeBox";

export const AddVideoModalContext = createContext({
    isOpen: false,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setOpen: (_i: boolean) => {}
});

export default function App(): JSX.Element {
    const [isOpen, setOpen] = useState(false);
    const [videoDataList, setVideoDataList] = useAtom(videoDataListAtom);

    return (
        <div className="sidebar_placeholder" style={{
            width: "450px",
            height: "100%",
            padding: "30px",
            border: "1px solid black",
            background: "#F5F5F5"
        }}>
            <AddVideoModalContext.Provider value={{ isOpen, setOpen }}>
                <AddVideoModal />
                <VideoControllersContainer />
            </AddVideoModalContext.Provider>

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
