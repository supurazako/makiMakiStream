import type { MetaFunction } from "@remix-run/node";
import { Sidebar } from "~/components/sidebar";
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
                <Sidebar />
            </aside>
            <VideosContainer />
        </main>
    );
}
