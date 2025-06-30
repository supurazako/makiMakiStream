import { JSX } from "react";
import { AddVideoButton } from "~/components/controller/video-controller/AddVideoButton";

import "~/styles/start-screen.css";

export function StartScreen(): JSX.Element {
	return (
		<section id="start-screen">
			<AddVideoButton />
		</section>
	)
}
