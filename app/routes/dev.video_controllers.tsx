import { createContext } from "react";
import { AddVideoModal } from "~/components/common/modal";
import { VideoControllersContainer } from "~/components/video_controllers";
import { useLocalStorage } from "~/hooks/useLocalStorage";
import { Video, VideoTest } from "~/interfaces";

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
    const [videoList, setVideoList] = useLocalStorage<Video[]>("videoList", [
        new VideoTest(false, 0.3, 0),
        new VideoTest(false, 0.3, 1),
    ], l => JSON.stringify(l.map(v => {
        const obj = JSON.parse(JSON.stringify(v));
        switch (v.constructor) {
            case VideoTest:
                obj.type = "VideoTest";
                break;
            default:
                throw new Error("Invalid class");
        }
        return obj;
    })), (item) => JSON.parse(item).map((v: { type: string }) => {
        switch (v.type) {
            case "VideoTest":
                return Object.assign(new VideoTest(false, 0, 0), v);
            default:
                throw new Error("Invalid class");
        }
    }));
    const [isOpen, setOpen] = useLocalStorage("isOpen", false);

    console.log(videoList);

    return (
        <div>
            <AddVideoModalContext.Provider value={{ isOpen, setOpen }}>
                <VideoListContext.Provider value={{ videoList, setVideoList }}>
                    <AddVideoModal />
                    <VideoControllersContainer />
                </VideoListContext.Provider>
            </AddVideoModalContext.Provider>
        </div>
    );
}
