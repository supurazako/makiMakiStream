import { AddVideoButton } from "~/components/video-controller/AddVideoButton";

import "~/styles/start-screen.css";

export function StartScreen(): JSX.Element {
    return (
        <section id="start-screen">
            <AddVideoButton />
        </section>
    )
}
