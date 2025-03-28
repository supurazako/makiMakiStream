import { createContext, useState } from "react";
import { AddVideoModal } from "~/components/common/modal";
import { VideoControllersContainer } from "~/components/video_controllers";
import { TwitchVideo, Video } from "~/interfaces";

export const VideoListContext = createContext<{ videoList: Video[], setVideoList: (v: Video[]) => void }>({
    videoList: [],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setVideoList: (_l: Video[]) => {}
});
export const AddVideoModalContext = createContext({
    isOpen: false,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setOpen: (_i: boolean) => {}
});

export default function App(): JSX.Element {
    const [videoList, setVideoList] = useState<Video[]>([
        new TwitchVideo("aoi_uii")
    ])
    const [isOpen, setOpen] = useState(false);

    return (
        <div>
            <AddVideoModalContext.Provider value={{ isOpen, setOpen }}>
                <VideoListContext.Provider value={{ videoList, setVideoList }}>
                    <AddVideoModal />
                    <VideoControllersContainer />
                </VideoListContext.Provider>
            </AddVideoModalContext.Provider>

            {videoList[0].createElement("player")}
        </div>
    );
}
