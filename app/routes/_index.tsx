import type { MetaFunction } from "@remix-run/node";
import { Sidebar } from "~/components/sidebar";
import { VideoControllersContainer } from "~/components/video_controllers";
import { VideosContainer } from "~/components/VideosContainer";

export const meta: MetaFunction = () => {
    return [
        { title: "Maki-Maki-Stream（仮）" }
    ];
};

export default function Index() {
    return (
        <main>
            <aside>
                <Sidebar>
                    <VideoControllersContainer />
                </Sidebar>
            </aside>
            <VideosContainer />
        </main>
    );
}
