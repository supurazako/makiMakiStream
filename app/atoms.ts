import { atomWithStorage, createJSONStorage, } from "jotai/utils";
import { TwitchVideo, Video, VideoTest } from "~/interfaces";

const videoListStorage = createJSONStorage<Video[]>(
    () => localStorage,
    {
        reviver: (_k, value) => {
            if (typeof value === "object" && value !== null) {
                switch ((value as { type: string }).type) {
                    case "VideoTest":
                        return Object.assign(new VideoTest(false, 0, 0), value);
                    case "TwitchVideo":
                        return Object.assign(new TwitchVideo(""), value);
                    default:
                        throw new Error("Invalid video type");
                }
            }
            return value;
        }
    }
);

export const videoListAtom = atomWithStorage<Video[]>("videoList", [], videoListStorage,);
