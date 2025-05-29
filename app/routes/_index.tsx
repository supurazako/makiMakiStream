import { type ActionFunctionArgs, type MetaFunction } from "react-router";
import { google } from "googleapis";
import { useAtom } from "jotai";
import { getStreams, getTwitchAccessToken, searchChannels } from "~/.server/utils/twitch";
import { videoDataListAtom } from "~/atoms";
import { GlobalController } from "~/components/GlobalController";
import { LayoutSelector } from "~/components/layout-selector/LayoutSelector";
import { Sidebar } from "~/components/sidebar";
import { StartScreen } from "~/components/StartScreen";
import { VideoControllersContainer } from "~/components/video-controller/VideoControllersContainer";
import { VideosContainer } from "~/components/VideosContainer";
import { getTwitchChannelName, getYoutubeVideoId } from "~/utils/RegularExpression";

export const meta: MetaFunction = () => {
    return [
        { title: "Maki-Maki-Stream（仮）" }
    ];
};

export type VideoContent = {
    type: "Video";
    value: string;
    title: string;
    channel: string;
    thumbnail: string;
}

export type ChannelContent = {
    type: "Channel";
    value: string;
    name: string;
    icon: string;
}

export type SearchActionResult = {
    exact_match?: ChannelContent | VideoContent;
    contents: VideoContent[];
}

export async function action({ request, context }: ActionFunctionArgs) {
    const formData = await request.formData();
    const query = formData.get("param") as string;

    const platform = formData.get("platform") as string;
    switch (platform) {
        case "youtube": {
            const youtube = google.youtube({
                version: "v3",
                auth: context.cloudflare.env.GOOGLE_API_KEY
            });

            let exactMatch: VideoContent | undefined = undefined;
            const exactMatchVideo = await youtube.videos.list({
                part: ["snippet"],
                id: [getYoutubeVideoId(query) ?? query],
                maxResults: 1
            });
            if (exactMatchVideo.data.items?.length) {
                const item = exactMatchVideo.data.items[0];
                exactMatch = {
                    type: "Video",
                    value: item.id ?? "",
                    title: item.snippet?.title ?? "",
                    channel: item.snippet?.channelTitle ?? "",
                    thumbnail: item.snippet?.thumbnails?.default?.url ?? ""
                } as VideoContent;
            }

            const response = await youtube.search.list({
                part: ["snippet"],
                q: query,
                type: ["video"],
                maxResults: 20,
                order: "relevance",
                videoEmbeddable: "true"
            });

            const contents = response.data.items?.map(item => {
                return {
                    type: "Video",
                    value: item.id?.videoId ?? "",
                    title: item.snippet?.title ?? "",
                    channel: item.snippet?.channelTitle ?? "",
                    thumbnail: item.snippet?.thumbnails?.default?.url ?? ""
                } as VideoContent;
            }) ?? [];

            return {
                exact_match: exactMatch,
                contents: contents
            };
        }
        case "twitch": {
            let exactMatch: ChannelContent | VideoContent | undefined = undefined;
            const contents = [] as VideoContent[];
            const accessToken = await getTwitchAccessToken(context.cloudflare.env.TWITCH_CLIENT_ID, context.cloudflare.env.TWITCH_CLIENT_SECRET);

            // 完全一致するチャンネルがあれば取得する。urlが渡された場合チャンネル名を取得したうえで検索する。
            const channelName = getTwitchChannelName(query) ?? query;
            const channelsResponse = await searchChannels(accessToken, context.cloudflare.env.TWITCH_CLIENT_ID, channelName, { first: 1 });
            const exactMatchChannel = channelsResponse.data.find(ch => ch.broadcaster_login === channelName);
            if (exactMatchChannel) {
                exactMatch = {
                    type: "Channel",
                    value: exactMatchChannel.broadcaster_login,
                    name: exactMatchChannel.display_name,
                    icon: exactMatchChannel.thumbnail_url.replace("{width}", "320").replace("{height}", "320")
                };
            }

            // その他、queryから検索したチャンネルから配信を取得する。
            const onlineChannelsResponse = await searchChannels(accessToken, context.cloudflare.env.TWITCH_CLIENT_ID, query as string, { liveOnly: true, first: 20 });

            const streamsJson = await getStreams(accessToken, context.cloudflare.env.TWITCH_CLIENT_ID, { userId: onlineChannelsResponse.data.map(ch => ch.id) });

            streamsJson.data.map(item => {
                return {
                    type: "Video",
                    value: item.user_login,
                    title: item.title,
                    channel: item.user_name,
                    thumbnail: item.thumbnail_url.replace("{width}", "320").replace("{height}", "180")
                } as VideoContent;
            }).forEach(item => {
                contents.push(item);
            });

            return Response.json({
                exact_match: exactMatch,
                contents: contents
            });
        }
        default: return { error: "Invalid platform" };
    }
}

export default function Index() {
    const [videoDataList, setVideoList] = useAtom(videoDataListAtom);

    return (
        <main>
            {
                videoDataList.length > 0 && (
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
                )
            }
            {
                videoDataList.length > 0 && <VideosContainer />
            }
            {
                videoDataList.length === 0 && <StartScreen />
            }
        </main>
    );
}
