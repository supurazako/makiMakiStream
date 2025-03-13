import { useAtom } from "jotai";
import { createContext, useEffect, useState } from "react";
import { videoListAtom } from "~/atoms";
import { AddVideoModal } from "~/components/common/modal";
import { VideoControllersContainer } from "~/components/video_controllers";
import { TwitchVideo, Video, VideoTest } from "~/interfaces";

export const VideoListContext = createContext<{ videoList: Video[], setVideoList: (v: Video[]) => void }>({
    videoList: [],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setVideoList: (_l: Video[]) => { }
});
export const AddVideoModalContext = createContext({
    isOpen: false,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setOpen: (_i: boolean) => { }
});

export default function App(): JSX.Element {
    const [videoList, setVideoList] = useAtom<Video[]>(videoListAtom);
    const [isOpen, setOpen] = useState(false);

    useEffect(() => {
        try {
            const item = JSON.parse(localStorage.getItem("videoList") || "[]");
            setVideoList(item.map((v: object & { type: string }) => {
                switch (v.type) {
                    case "VideoTest":
                        return Object.assign(new VideoTest(false, 0, 0), v);
                    case "TwitchVideo":
                        return Object.assign(new TwitchVideo(""), v);
                    default:
                        throw new Error("Invalid video type");
                }
            }));
        } catch (e) {
            console.error(e);
        }
    }, []);

    return (
        <div>
                <AddVideoModalContext.Provider value={{ isOpen, setOpen }}>
                    <VideoListContext.Provider value={{ videoList, setVideoList }}>
                        <AddVideoModal />
                        <VideoControllersContainer />
                    </VideoListContext.Provider>
                </AddVideoModalContext.Provider>

            {videoList[0] && videoList[0].createElement("player")}
            {videoList[1] && videoList[1].createElement("player1")}
            <button onClick={() => console.log(videoList)}>Button</button>
        </div>
    );
}
