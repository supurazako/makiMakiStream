import type { MetaFunction } from "@remix-run/node";
import { useSetAtom } from "jotai";
import { videoDataListAtom } from "~/atoms";
import { Modal } from "~/components/common/Modal";
import { GlobalController } from "~/components/GlobalController";
import { LayoutSelector } from "~/components/layout-selector/LayoutSelector";
import { Sidebar } from "~/components/sidebar";
import { VideoControllersContainer } from "~/components/video-controller/VideoControllersContainer";
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
                    <LayoutSelector />
                    <hr className="separator" />
                    <GlobalController />
                    <hr className="separator" />
                    <VideoControllersContainer />
                    {
                        /* テスト用ボタン。Modalの修正がマージされたら消してね */
                        <button onClick={() => setVideoList(prev => [...prev, { platform: "twitch", channel: "amakipururu", id: crypto.randomUUID() }])}>
                            {"[test] Add twitch video"}
                        </button>
                    }
                    <button onClick={() => setVideoList(prev => [...prev, { platform: "youtube", videoId: "NnKVD-DZmYQ", id: crypto.randomUUID() }])}>
                        {"[test] Add youtube video"}
                    </button>
                </Sidebar>
            </aside>
            <VideosContainer />
            <Modal />
        </main>
    );
}
