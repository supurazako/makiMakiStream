import type { MetaFunction } from "@remix-run/node";
import { useSetAtom } from "jotai";
import { videoDataListAtom } from "~/atoms";
import { Sidebar } from "~/components/sidebar";
import { VideoControllersContainer } from "~/components/video_controllers";
import { VideosContainer } from "~/components/VideosContainer";

export const meta: MetaFunction = () => {
    return [
        { title: "Maki-Maki-Stream（仮）" }
    ];
};

export default function Index() {
    const setVideoList = useSetAtom(videoDataListAtom);

    return (
        <main>
            <aside>
                <Sidebar>
                    <VideoControllersContainer />
                    {
                        /* テスト用ボタン。Modalの修正がマージされたら消してね */
                        <button onClick={() => setVideoList(prev => [...prev, { platform: "twitch", channel: "akamikarubi" }])}>
                            {"[test] Add twitch video"}
                        </button>
                    }
                </Sidebar>
            </aside>
            <VideosContainer />
        </main>
    );
}
