import { GlobalMuteControl } from "./GlobalMuteControl";
import { GlobalPlayControl } from "./GlobalPlayControl";

import "~/styles/global-controller.css";

export function GlobalController(): JSX.Element {
	return (
		<section className="global-controller" aria-label="グローバルコントローラ">
			<GlobalPlayControl />
			<GlobalMuteControl />
		</section >
	)
}
