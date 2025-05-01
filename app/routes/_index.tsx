import { json, type ActionFunctionArgs, type MetaFunction } from "@remix-run/node";
import { useSetAtom } from "jotai";
import { videoDataListAtom } from "~/atoms";
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

export type VideoContent = {
    value: string;
    title: string;
    channel: string;
    thumbnail: string;
}

export type SearchActionResult = {
    contents: VideoContent[];
}

export async function action({ request }: ActionFunctionArgs) {
    const formData = await request.formData();

    const platform = formData.get("platform") as string;
    switch (platform) {
        case "youtube": return {};
        case "twitch": return json<SearchActionResult>({ contents: [
            {
                value: "akamikarubi",
                title: "Test Video",
                channel: "Test Channel",
                thumbnail: "https://example.com/thumbnail.jpg"
            },
            {
                value: "akamikarubi",
                title: "Another Video",
                channel: "Another Channel",
                thumbnail: "https://example.com/thumbnail2.jpg"
            },
            {
                value: "akamikarubi",
                title: "Test Video",
                channel: "Test Channel",
                thumbnail: "https://example.com/thumbnail.jpg"
            },
            {
                value: "akamikarubi",
                title: "Another Video",
                channel: "Another Channel",
                thumbnail: "https://example.com/thumbnail2.jpg"
            },
        ] });
        case "other": return {};
        default: return { error: "Invalid platform" };
    }
}

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
        </main>
    );
}
