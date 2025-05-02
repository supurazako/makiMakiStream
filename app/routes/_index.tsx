import { json, type ActionFunctionArgs, type MetaFunction } from "@remix-run/node";
import { useSetAtom } from "jotai";
import { getTwitchAccessToken } from "~/.server/utils";
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
        case "twitch": {
            const accessToken = await getTwitchAccessToken();

            const channelsResponse = await fetch(`https://api.twitch.tv/helix/search/channels?query=${formData.get("param")}`, {
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                    "Client-ID": process.env.TWITCH_CLIENT_ID!,
                }
            });
            const channelJson = await channelsResponse.json();
            const logins: string[] = channelJson.data.map((ch: any) => ch.broadcaster_login);

            console.log(channelJson.data);

            const loginParams = logins.map((login) => `user_login=${encodeURIComponent(login)}`).join("&");
            const streamsResponse = await fetch(`https://api.twitch.tv/helix/streams?${loginParams}`, {
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                    "Client-ID": process.env.TWITCH_CLIENT_ID!,
                },
            });
            const streamsJson = await streamsResponse.json();

            const contents: VideoContent[] = streamsJson.data.map((item: any) => {
                return {
                    value: item.user_id,
                    title: item.title,
                    channel: item.user_name,
                    thumbnail: item.thumbnail_url.replace("{width}", "320").replace("{height}", "180")
                };
            });

            return json<SearchActionResult>({
                contents: contents
            });
        }
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
