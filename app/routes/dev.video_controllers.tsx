import { createContext, useState } from "react";
import { VideoControllersContainer } from "~/components/video_controllers";
import { Video, VideoTest } from "~/interfaces";

export const VideoListContext = createContext<{ videoList: Video[], setVideoList: (v: Video[]) => void }>({
    videoList: [],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setVideoList: (_l: Video[]) => { }
});

export default function App(): JSX.Element {
    const [videoList, setVideoList] = useState<Video[]>([new VideoTest(false, 0)])

    return (
        <VideoListContext.Provider value={{ videoList, setVideoList }}>
            <VideoControllersContainer />
        </VideoListContext.Provider>
    );
}