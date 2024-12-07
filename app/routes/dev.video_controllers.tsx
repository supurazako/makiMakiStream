import { createContext, useState } from "react";
import { VideoControllersContainer } from "~/components/video_controllers";

export const VideoListContext = createContext<{ videoList: string[], setVideoList: (v: string[]) => void }>({
    videoList: [],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setVideoList: (_l: string[]) => { }
});

export default function App(): JSX.Element {
    const [videoList, setVideoList] = useState<string[]>([])

    return (
        <VideoListContext.Provider value={{ videoList, setVideoList }}>
            <VideoControllersContainer />
        </VideoListContext.Provider>
    );
}